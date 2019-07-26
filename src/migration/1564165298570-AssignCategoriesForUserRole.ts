import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { Category } from "../entity/Category";
import { RoleToCategory } from "../entity/RoleToCategory";
import { Role } from "../entity/Role";

export class AssignCategoriesForUserRole1564165298570 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const categoryRepository = getRepository(Category);
        const allCategories = await categoryRepository.find();
        const roleToCategoryRepository = getRepository(RoleToCategory);
        const roleRepository = getRepository(Role);

        let userRole: Role;
        try {
            userRole = await roleRepository.findOneOrFail({ where: { name: 'USER' } });
        }
        catch (error) {
            console.log('Migration has failed. Please run typeorm migration:revert to revert latest changes', error);
            return;
        }

        const userCategories = allCategories.filter(cat => {
            const lowerName = cat.name.toLowerCase();
            return !(lowerName.includes('municipality') ||
                    lowerName.includes('news') ||
                    lowerName.includes('deals') ||
                    lowerName.includes('donation'));
        }).map(cat => {
            return {
                roleId: userRole.id,
                categoryId: cat.id
            }
        })

        roleToCategoryRepository.insert(userCategories);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
