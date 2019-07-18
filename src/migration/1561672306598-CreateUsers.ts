import { MigrationInterface, QueryRunner, getRepository, getConnection } from "typeorm";
import { User } from "../entity/User";
import DefaultAdmins from "./seed/DefaultAdmins";

export class CreateAdminUser1561672306598 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const userRepository = getRepository(User);
        await userRepository.save(DefaultAdmins);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(User)
            .execute();
    }
    
}
