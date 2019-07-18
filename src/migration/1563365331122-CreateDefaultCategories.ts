import { MigrationInterface, QueryRunner, getRepository, getConnection } from "typeorm";
import { Category } from "../entity/Category";
import DefaultCategories from './seed/DefaultCategories';
import { Role } from "../entity/Role";
import { RoleToCategory } from "../entity/RoleToCategory";

export class CreateDefaultCategories1563365331122 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const categoryRepository = getRepository(Category);
        await categoryRepository.save(DefaultCategories)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Category)
            .execute();
    }

}
