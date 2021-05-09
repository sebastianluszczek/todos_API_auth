const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

const { handleError, logError } = require('./utils/error.utils');

app.use(express.json());

const { verifyToken } = require('./middlewares/auth.middlewares');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todos API',
      version: '1.0.0',
      description:
        'Simple Todo REST API created in Express.JS. Aplication use MongoDB to persist data and docker \
        (and docker-compose) for development. API is secured by JWT and another auth service.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  // Paths to files containing OpenAPI definitions
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', verifyToken);

app.use('/api/todos', require('./routes/todo.routes'));

app.use(logError);
app.use(handleError);

module.exports = app;
