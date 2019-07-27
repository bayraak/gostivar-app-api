import { Request, Response } from "express";
import { getRepository, getConnection } from "typeorm";
import { validate } from "class-validator";

import { Category } from "../entity/Category";
import { Role } from "../entity/Role";
import { RoleToCategory } from "../entity/RoleToCategory";
import { CreateCategoryDTO } from "../models/category";

class CategoryController {
    static listAll = async (req: Request, res: Response) => {
        const categoryRepository = getRepository(Category);
        const categories = await categoryRepository.find();

        if (categories.length > 0) {
            return res.status(200).send(categories);
        }

        return res.status(404).send('Categories not found');
    };

    static getOneById = async (req: Request, res: Response) => {
        const id: number = req.params.id;

        const categoryRepository = getRepository(Category);
        try {
            const category = await categoryRepository.findOneOrFail(id);
            return res.send(category);
        }
        catch (error) {
            return res.status(404).send(`Category with id: ${id} not found`);
        }
    };

    static newCategory = async (req: Request, res: Response) => {
        const createCategoryDto: CreateCategoryDTO = req.body;

        let category = new Category();
        category.name = createCategoryDto.categoryName;

        const errors = await validate(category);
        if (errors.length > 0) {
            return res.status(400).send(errors);
        }

        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();

        await queryRunner.startTransaction();
        let savedCategory: Category;
        try {
            const roleRepository = getRepository(Role);
            const role = await roleRepository.findOneOrFail({where: {name: createCategoryDto.role}});
            
            const categoryRepository = getRepository(Category);
            savedCategory = await categoryRepository.save(category);
            
            const roleToCategoryRepository = getRepository(RoleToCategory);
            const roleToCategory = new RoleToCategory();
            roleToCategory.roleId = role.id;
            roleToCategory.categoryId = category.id;
            roleToCategoryRepository.save(roleToCategory)
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            return res.status(500).send(error);
        }
        finally {
            await queryRunner.release();
            return res.status(201).send(savedCategory);
        }
    };

    static editCategory = async (req: Request, res: Response) => {
        const id = req.params.id;
        const { name } = req.body;

        const categoryRepository = getRepository(Category);
        let category: Category;
        try {
            category = await categoryRepository.findOneOrFail(id);
        }
        catch (error) {
            return res.status(404).send(`Category with id: ${id} not found`);
        }

        if(category.name.toLowerCase() == name.toLowerCase()) {
            return res.status(409).send(`No changes made. Category name is same: "${name}"`)
        }

        category.name = name;

        const errors = await validate(category);
        if (errors.length > 0) {
            return res.status(400).send(errors);
        }

        try {
            await categoryRepository.save(category);
            return res.status(204).send();
        }
        catch (error) {
            return res.status(500).send(error);
        }
    };

    static deleteCategory = async (req: Request, res: Response) => {
        const id = req.params.id;

        const categoryRepository = getRepository(Category);

        try {
            await categoryRepository.findOneOrFail(id);
        }
        catch (error) {
            return res.status(404).send(`Category with id: ${id} not found`);
        }

        try {
            await categoryRepository.delete(id);
            return res.status(204).send();
        }
        catch (error) {
            return res.status(500).send(error);
        }
    };
}

export default CategoryController;