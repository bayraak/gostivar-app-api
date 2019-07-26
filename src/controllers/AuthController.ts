import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import moment from 'moment';
import { User } from "../entity/User";
import config from "../config/config";
import { LoginDTO } from "../models/login";
import {plainToClass} from "class-transformer";
import { ResetPasswordToken } from "../entity/ResetPasswordToken";
import PasswordGenerator from '../utils/passwordGenerator';
import MailSender from '../utils/mailSender';
import { Role } from "../entity/Role";
class AuthController {

    static login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(401).send({err: 'Please provide email and password'});
        }

        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({relations: ["role"], where: {email}});
        } catch (err) {
            return res.status(401).send({err: 'Wrong credentials.'});
        }

        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            return res.status(401).send();
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username, email: user.email, role: user.role.name },
            config.jwtSecret,
            { expiresIn: "30d" }
        );

        const loginDto: LoginDTO = {
            userId: user.id,
            role: user.role.name,
            accessToken: token,
            expiresIn: moment().add(30, 'day').unix()
        };

        res.send(loginDto);
    }

    static register = async (req: Request, res: Response) => {
        const { email, password, firstName, lastName } = req.body;
        if (!(email && password)) {
            return res.status(400).send({err: 'Please provide email and password'});
        }

        const userRepository = getRepository(User);
        let user = await userRepository.findOne({where: {email}});

        if (user) {
            return res.status(400).send({err: 'User exists with this email address.'});
        }

        const roleRepository = getRepository(Role);
        const role = await roleRepository.findOne(2);

        user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.role = role;
        user.email = email;
        user.password = password;
        user.username = email;
        user.hashPassword();

        try {
            await userRepository.save(user);
        } catch (e) {
            return res.status(400).send({err: 'Error occurred.'});
        }

        const createdUser = plainToClass(User, user);
        res.status(201).send(createdUser);
    }

    static forgotPassword = async (req: Request, res: Response) => {
        const { email } = req.body;
        if (!email) {
            return res.status(400).send({err: 'Please provide an email address'});
        }

        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({where: {email}});
        } catch (err) {
            return res.status(404).send({err: 'Email address is not registered'});
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            config.jwtSecret,
            { expiresIn: "1h" }
        );

        const resetPasswordToken = new ResetPasswordToken();
        resetPasswordToken.token = token;
        resetPasswordToken.user = user;

        const resetPasswordRepository = getRepository(ResetPasswordToken);
        try {
            await resetPasswordRepository.save(resetPasswordToken);
            await MailSender.sendResetPassword(user.email, token);
            return res.status(200).send();
        } catch (e) {
            console.log(e);
            return res.status(400).send({err: 'Error occurred'});
        }
    }

    static resetPassword = async (req: Request, res: Response) => {
        const { token } = req.query;
        if (!token) {
            return res.status(400).send({err: 'No token found'});
        }

        const resetPasswordRepository = getRepository(ResetPasswordToken);
        let resetPasswordToken: ResetPasswordToken;
        try {
            resetPasswordToken = await resetPasswordRepository.findOneOrFail({where: {token}});
        } catch (err) {
            return res.status(404).send({err: 'Token not found'});
        }

        if (resetPasswordToken.status === 1) {
            return res.status(400).send({err: 'Token already used'});
        }

        let jwtPayload;
        try {
            jwtPayload = <any>jwt.verify(resetPasswordToken.token, config.jwtSecret);
            const { email, userId } = jwtPayload;
            const userRepository = getRepository(User);
            let user: User;

            try {
                await resetPasswordRepository.update(resetPasswordToken.id, {status: 1});
            } catch (err) {
                return res.status(400).send({err: 'Error occurred'});
            }

            try {
                user = await userRepository.findOneOrFail({where: {email}});
                const password = PasswordGenerator.generate();
                user.password = password;
                user.hashPassword();

                try {
                    await userRepository.update(userId, {password: user.password});
                    await MailSender.sendNewPassword(user.email, password);
                    res.status(200).send();
                } catch (err) {
                    return res.status(400).send({err: 'Error occurred'});
                }
                
            } catch (err) {
                return res.status(400).send({err: 'No user found'});
            }

        } catch (error) {
            return res.status(400).send({err: 'Token is expired'});
        }
    }

}

export default AuthController;