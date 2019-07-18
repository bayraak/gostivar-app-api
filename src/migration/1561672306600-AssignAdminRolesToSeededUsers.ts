import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { User } from "../entity/User";
import { Role } from "../entity/Role";

export class AssignAdminRolesToSeededUsers1561672306600 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const userRepository = getRepository(User);
        const roleRepository = getRepository(Role);

        const users = await userRepository.find();
        let adminRole: Role;
        try {
            adminRole = await roleRepository.findOneOrFail({ where: { name: 'ADMIN' }});
        }
        catch (error) {
            console.log('No admin role found in roles table. Please run typeorm migration:revert to revert migration history' , error);
            return;
        }

        users.forEach(user => {
            user.role = adminRole;
        })

        userRepository.save(users);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
