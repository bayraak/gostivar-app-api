import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { Role } from "../entity/Role";
import { User } from "../entity/User";
import MockUsers from "./seed/MockUsers";

export class AddMockUsers1563524762235 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const roleRepository = getRepository(Role);
        const userRepository = getRepository(User);

        let userRole: Role;
        try {
            userRole = await roleRepository.findOneOrFail({ where: { name: 'USER' } });
        }
        catch (error) {
            console.log('No USER role found in roles table. Please run typeorm migration:revert to revert migration history' , error);
            return;
        }

        let readyToSaveUsers: User[] = [];

        readyToSaveUsers = MockUsers.map(user => {
            user.role = userRole
            return user
        });

        await userRepository.save(readyToSaveUsers);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const userRepository = getRepository(User);

        const promiseOfUsers = MockUsers.map(async user => {
            const foundUser = await userRepository.findOne({where: {username: user.username}});
            return foundUser;
        });

        const users = await Promise.all(promiseOfUsers);
        await userRepository.remove(users);
    }

}
