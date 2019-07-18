import {MigrationInterface, QueryRunner, getRepository, getConnection} from "typeorm";
import { Role } from "../entity/Role";
import { User } from "../entity/User";

export class AddDefaultRoles1561672306599 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const userRepository = getRepository(User);

        let adminRole = new Role();
        adminRole.name = 'ADMIN';
        let userRole = new Role();
        userRole.name = 'USER';

        const roles = [adminRole, userRole];

        const users = await userRepository.find();
        
        const roleRepository = getRepository(Role);
        roleRepository.insert(roles);

        users.forEach(user => {
            user.role = adminRole;
        })

        await userRepository.save(users);

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Role)
            .execute();
    }

}
