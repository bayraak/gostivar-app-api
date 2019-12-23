import { Request, Response } from "express";
import { getRepository, getConnection, UpdateResult } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity/User";
import { plainToClass } from "class-transformer";
import { Role } from "../entity/Role";
import { RoleToCategory } from "../entity/RoleToCategory";
import { ProfilePreferences } from "../entity/ProfilePreferences";

class UserController {

    static listAll = async (req: Request, res: Response) => {
        //Get users from database
        const userRepository = getRepository(User);
        const users = await userRepository.find();

        //Send the users object
        res.send(users);
    };

    static getOneById = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id: number = +req.params.id;

        const { role, userId } = res.locals.jwtPayload;

        if (id !== userId && role !== 'ADMIN') {
            return res.status(403).send("User does not have permission to get another users info");
        }

        //Get the user from database
        const userRepository = getRepository(User);
        try {
            const user = await userRepository.findOneOrFail(id, { relations: ["role", "profilePreferences"] });
            const userDTO = plainToClass(User, user);
            return res.send(userDTO);
        } catch (error) {
            res.status(404).send({ message: "User not found", details: error });
        }
    };

    static newUser = async (req: Request, res: Response) => {
        //Get parameters from the body
        let { firstName, lastName, email, username, password, role } = req.body;
        const roleRepository = getRepository(Role);

        let roleEntity: Role;
        try {
            roleEntity = await roleRepository.findOneOrFail({ where: { name: role } })
        }
        catch (error) {
            return res.status(400).send(`Role not found. send proper role name. Details: ${error}`);
        }

        let user = new User();
        user.username = username;
        user.password = password;
        user.role = roleEntity;
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;

        //Validade if the parameters are ok
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Hash the password, to securely store on DB
        user.hashPassword();

        //Try to save. If fails, the username is already in use
        const userRepository = getRepository(User);
        try {
            const savedUser = await userRepository.save(user);

            //If all ok, send 201 response
            const createdUser = plainToClass(User, savedUser);
            return res.status(201).send(createdUser);
        } catch (e) {
            res.status(409).send(`username already in use. Details: ${e}`);
            return;
        }
    };

    static editUser = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        const { username, role } = req.body;
        const roleRepository = getRepository(Role);

        let roleEntity: Role;
        try {
            roleEntity = await roleRepository.findOneOrFail({ where: { name: role } })
        }
        catch (error) {
            return res.status(400).send(`Role not found. send proper role name. Details: ${error}`);
        }

        //Try to find user on database
        const userRepository = getRepository(User);
        let user;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("User not found");
            return;
        }

        //Validate the new values on model
        user.username = username;
        user.role = roleEntity;
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe, if fails, that means username already in use
        try {
            await userRepository.save(user);
        } catch (e) {
            res.status(409).send(`username already in use. Details: ${e}`);
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };

    static deleteUser = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send("User not found");
            return;
        }
        userRepository.delete(id);

        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };

    static getAvailableCategoriesForPublish = async (req: Request, res: Response) => {
        const id: number = +req.params.id;
        const userRepository = getRepository(User);
        const roleToCategoryRepository = getRepository(RoleToCategory);

        let categories: RoleToCategory[];
        try {
            const user = await userRepository.findOneOrFail({ where: { id: id }, relations: ['role'] });
            categories = await roleToCategoryRepository.find({ where: { roleId: user.role.id }, relations: ['category'] })
        } catch (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(categories);
    };

    static updateEnabledNotifications = async (req: Request, res: Response) => {
        const { userId } = res.locals.jwtPayload;

        const notifications: { id: number, name: string }[] = req.body;

        if (!notifications.length) {
            return res.status(400).send('Notifications should be sent as array id and name pair');
        }

        try {
            const userRepository = getRepository(User);
            const user = await userRepository.findOneOrFail({ where: { id: userId }, relations: ['profilePreferences'] });

            const updateResult: UpdateResult = await getConnection()
                .createQueryBuilder()
                .update(ProfilePreferences)
                .set({ enabledCategoryNotifications: notifications })
                .where("id = :id", { id: user.profilePreferences.id })
                .execute();

            // affected is for affected column numbers
            if (updateResult.affected && updateResult.affected > 0) {
                return res.status(202).send();
            }

            return res.status(400).send('No change is made in profile settings');
        }
        catch (err) {
            return res.status(400).send({ message: 'Error occured', details: err });
        }
    };

    static updateProfilePreferences = async (req: Request, res: Response) => {
        try {
            const {
                preferedLanguage,
                profileDisplayAs
            } = req.body;

            if (!preferedLanguage || !profileDisplayAs) {
                return res.status(400).send('Model validation error');
            }

            const { userId, role } = res.locals.jwtPayload;
            const id: number = +req.params.id;

            if (id !== userId && role !== 'ADMIN') {
                return res.status(403).send("User does not have permission to update another users info");
            }

            const userRepository = getRepository(User);

            const user = await userRepository.findOneOrFail({ where: { id: userId }, relations: ['profilePreferences'] });

            const updateResult: UpdateResult = await getConnection()
                .createQueryBuilder()
                .update(ProfilePreferences)
                .set({
                    preferedLanguage: preferedLanguage,
                    profileDisplayAs: profileDisplayAs
                })
                .where("id = :id", { id: user.profilePreferences.id })
                .execute();

            // affected is for affected column numbers
            // should return 2 for 2 updated columns
            if (updateResult.affected && updateResult.affected > 0) {
                return res.status(202).send();
            }

            return res.status(400).send('No change is made in profile settings');
        }
        catch (error) {
            return res.status(400).send({ message: 'Error occurred', details: error })
        }
    }
};

export default UserController;