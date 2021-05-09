# TODO API with simple JWT authentication

Purpose of this application was to create simple TODO app working as REST API. API was based on Node and Express. For data persistance puprposes API was connected with MongoDB. In addition simple auth service was created to help simulate real world application. During development application uses docker-compose to run 4 containers:

- API (main Todo API)
- mongo (Todo's mongoDB database)
- auth (authentication API - user register and login -JWT creation)
- mongo-auth (MongoDB database for persisting users)

## Development

to run development environment:

```bash
git clone https://github.com/sebastianluszczek/todos_API_auth

cd todos_API_auth

docker-compose up --build
```

For automated tests puprose, while running _docker-compose_ application will be seeded with one test user

```js
{
  name: "test",
  email: "test@mail.com",
  password: "pass123"
}
```

## Features

During creating application I focused only on Todo's API, auth API is created only to show possibilities od connecting few microservices in development mode, seperation od concerns and to simulate more real-life like application.

Main parts of application:

- Todos API:

  - Express Todo's API
  - Docker & docker-compose dev environment
  - MongoDB connection
  - Code separation _(models, routes, controllers, services, tests)_
  - Standarized error handling (throwing and catching errors in one place, custom ErrorHandler)
  - Automated unit test of services with Jest (db connection) - usage of mongo-memory-server istead of mocks
  - Automated integration test with Jest & supertest (full requests test with JWT auth tests and req.body validations tests)
  - Swagger documentation with swagger-UI on http://localhost:3000/docs
  - JWT validation in middleware function

- Auth API:
  - Registration & user login
  - database passwords hashing
  - JWT creations

## What to do in future

Application is simple and it's only purpose was to show creator capabilities. In future it might get few thinks, like:

- better Todos API tests and auth API tests (right now none)
- swagger documentation with requests
- Husky for automate tests before repo push
- github CI/CD with image creation of APIs (for example to put them into AWS ECR and build EC2 according to them)
-
