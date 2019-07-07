const swaggerDefinition = {
    "info": {
        "version": "1.0.0",
        "title": "GostivarApp.API DOCS",
        "description": "GostivarApp interactive RESTful API documentation",
        "termsOfService": "#",
        "contact": {
            "name": "GostivarAppTeam"
        },
        "license": {
            "name": "GostivarApp license 2019"
        }
    },
    "securityDefinitions": {
        "bearerAuth": {
            "name": "Authorization",
            "in": "header",
            "type": "apiKey",
            "description": "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\""
        }
    },
    host: 'localhost:3000',
    basePath: '/api',
};

const path = 'src/docs/**/*.yml'

export const options = {
    // import swaggerDefinitions
    swaggerDefinition,
    // path to the API docs
    apis: [path],
};