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
import expressWinston from 'express-winston';
import { loggerOptions, errorLoggerOptions } from './config/winston';

createConnection().then(async connection => {

    const app = express();
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(expressWinston.logger(loggerOptions));
    app.use("/api", routes);
    app.use(expressWinston.errorLogger(errorLoggerOptions));

    if (process.env.NODE_ENV !== 'production') {
        const swaggerSpec = swaggerDocs(options);
        app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });

}).catch(error => console.log(error));
