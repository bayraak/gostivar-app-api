import {
    BaseEntity,
    Entity, PrimaryGeneratedColumn, Column,
    createConnection,
    ManyToOne, OneToMany,
    RelationId,
    Connection
} from "typeorm";
import express from "express";
import { Database, Resource, UseAsTitle, UseForSearch } from "admin-bro-typeorm";
import { validate } from 'class-validator'

import AdminBro, { AdminBroOptions } from "admin-bro";
import * as AdminBroExpress from "admin-bro-expressjs"
import { User } from "../entity/User";
import { ProfilePreferences } from "../entity/ProfilePreferences";
import { Category } from "../entity/Category";

Resource.validate = validate;
AdminBro.registerAdapter({ Database, Resource });


createConnection().then(async connection => {
    const app = express()
    const port = 3000

    const options: AdminBroOptions = {
        databases: [connection],
        // resources: [User, ProfilePreferences, Category]
        rootPath: '/admin'
    }
    const adminBro = new AdminBro(options)
    const router = AdminBroExpress.buildRouter(adminBro)

    app.get('/', (req, res) => res.send('Hello World!'))
    app.use(adminBro.options.rootPath, router)

    app.listen(port, () => console.log(`Admin panel app listening on port ${port}!`))

}).catch(error => console.log(error));