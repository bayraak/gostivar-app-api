import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { User } from "../entity/User";

export class CreateAdminUser1561672306598 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let user = new User();
        user.username = "admin";
        user.password = "admin";
        user.email = "ebrarislami@gmail.com";
        user.firstName = "Ebrar";
        user.lastName = "Islami";
        user.hashPassword();
        const userRepository = getRepository(User);
        await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
