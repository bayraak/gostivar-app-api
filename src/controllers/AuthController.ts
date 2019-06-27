import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import * as moment from 'moment';
import { User } from "../entity/User";
import config from "../config/config";
import { LoginDTO } from "../models/login";

class AuthController {

    static login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(401).send({err: 'Please provide email and password'});
        }

        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({where: {email}});
        } catch (err) {
            return res.status(401).send({err: 'Wrong credentials.'});
        }

        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            return res.status(401).send();
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username, email: user.email, role: user.role },
            config.jwtSecret,
            { expiresIn: "24h" }
        );

        const loginDto: LoginDTO = {
            userId: user.id,
            accessToken: token,
            expiresIn: moment().add(1, 'day').unix()
        };

        res.send(loginDto);
    }

}

export default AuthController;