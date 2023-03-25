import * as swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import {Application}  from 'express';

function swaggerIgnite(applicationInstance:Application) {
    const { PORT, APP_PATH } = process.env;
    // Swagger definition
    console.log(PORT ?? 4000)
    const swaggerDefinition = {
        info: {
            title: 'REST API for library-Backoffice', // Title of the documentation
            version: '1.0.0', // Version of the app
            description: 'This is the REST API for my library backoffice', // short description of the app
        },
        host: APP_PATH ?? 'localhost' + ':' + (PORT ?? 4000), // the host or url of the app
        basePath: '', // the basepath of your endpoint
        schemes: [
            "http"
        ],
    };

    // options for the swagger docs
    const options = {
        // import swaggerDefinitions
        swaggerDefinition,
        // path to the API docs
        apis: ["./src/swagger/swagger-docs/**/*.yml"],
    };

    const swaggerSpec = swaggerJSDoc(options);

    applicationInstance.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

export default swaggerIgnite;