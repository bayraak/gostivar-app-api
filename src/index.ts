import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes";
import './config/env';
import swaggerUi from 'swagger-ui-express';
import { options } from './config/swagger.config';
import swaggerDocs from 'swagger-jsdoc';

createConnection().then(async connection => {

    const app = express();
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use("/api", routes);

    if(process.env.NODE_ENV !== 'production') {
        const swaggerSpec = swaggerDocs(options);
        app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }

    app.listen(3000, () => {
        console.log("Server started on port 3000!");
    });

}).catch(error => console.log(error));
