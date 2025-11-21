import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Cronos',
            version: '1.0.0',
            description: 'Documentação da API para o Sistema de Gerenciamento de Projetos Cronos',
            contact: {
                name: 'Desenvolvedor',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Servidor de Desenvolvimento Local',
            },
        ],
    },
    apis: ['./src/routes/*.ts'], // Path to the API docs
};

export const specs = swaggerJsdoc(options);

export const setupSwagger = (app: any) => {
    const swaggerUi = require('swagger-ui-express');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
