import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Category } from "../entity/Category";
import { validate } from "class-validator";
import { User } from "../entity/User";
import { Role } from "../entity/Role";
import { RoleToCategory } from "../entity/RoleToCategory";

class CategoryController {
    static listAll = async (req: Request, res: Response) => {
        const categoryRepository = getRepository(Category);
        const categories = await categoryRepository.find();

        res.send(categories);
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
        let { name } = req.body;
        let category = new Category();
        category.name = name;

        const errors = await validate(category);
        if (errors.length > 0) {
            return res.status(400).send(errors);
        }

        const categoryRepository = getRepository(Category);
        try {
            const savedCategory = await categoryRepository.save(category);
            return res.status(201).send(savedCategory);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    }

    static editCategory = async (req: Request, res: Response) => {
        const id = req.params.id;
        const { name } = req.body;

        const categoryRepository = getRepository(Category);
        let category;
        try {
            category = await categoryRepository.findOneOrFail(id);
        }
        catch (error) {
            return res.status(404).send(`Category with id: ${id} not found`);
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

    static getAvailableCategoriesForUser = async (req: Request, res: Response) => {
        const id: number = req.params.id;
        const userRepository = getRepository(User);
        const roleToCategoryRepository = getRepository(RoleToCategory);

        let categories: RoleToCategory[];
        try {
            const user = await userRepository.findOneOrFail({ where: { id: id }, relations: ['role'] });
            categories = await roleToCategoryRepository.find({ where: { roleId: user.role.id }, relations: ['category'] })
        } catch (err) {
            return res.status(500).send('Error occurred');
        }
        return res.status(200).send(categories);
    }
}

export default CategoryController;