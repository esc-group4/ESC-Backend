// docs/swaggerConfig.js
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation using Swagger',
    },
  },
  apis: ['./docs/swaggerDefinitions.js'], // Path to the API docs definitions
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export default swaggerDocs;
