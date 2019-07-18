import {MigrationInterface, QueryRunner, getRepository, getConnection} from "typeorm";
import { Category } from "../entity/Category";
import DefaultCategories from "./seed/DefaultCategories";
import { Role } from "../entity/Role";
import { RoleToCategory } from "../entity/RoleToCategory";

export class AssignCategoriesForAdminRole1563443359144 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const categoryRepository = getRepository(Category);
        const allCategories = await categoryRepository.find();
        const roleToCategoryRepository = getRepository(RoleToCategory);
        const roleRepository = getRepository(Role);

        let adminRole: Role;
        try {
            adminRole = await roleRepository.findOneOrFail({ where: { name: 'ADMIN' }});
        }
        catch (error) {
            console.log('Migration has failed. Please run typeorm migration:revert to revert latest changes' , error);
            return;
        }

        let roleToCategoryArray = [];

        allCategories.forEach(cat => {
            const roleToCategory = {
                roleId: adminRole.id,
                categoryId: cat.id
            }
            roleToCategoryArray.push(roleToCategory);
        });

        roleToCategoryRepository.insert(roleToCategoryArray);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
