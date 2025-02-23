# Project Mark Challenge

Core features

- All core features were implemented

Complex Business Logic

- All implemented

Design pattern implemented:

- Factory: UserFactory to create User entity
- Strategy: to apply the role to the user and get the right permissions
- Composite: to find the path from to TopicComponent (Topic or Resource)

Error handling and validation

- I implemented error handling and validation for all endpoints and business logic

Unit and Integration Testing

- Implemented Unit tests with Jest
- Implemented E2E Tests with Super Test
  - I created a E2E test for Topic, I didn't have time to create to all endpoints
- Objects were mocked using Jest Mock
- Unfortunely, I didn't have to achieve a high test coverage (>80%)

Docker

- I created Docker files to simplify startup the app

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

For dev mode, go to [http://localhost:3000/docs](http://localhost:3000/docs)

You can use the Swagger to interact with the API.

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Run on Docker

```bash
# start docker compose
$ docker compose up
```

Go to [http://localhost:3010/docs](http://localhost:3010/docs)

## Techs

- Node.JS (v20)
- Typescript
- SQLite 3

## Libs

- NestJS: framework
- TypeORM: ORM for SQLite
- JWT: user auth token
- Swagger: to json:api
- Jest: unit test and integration
- Super Test: e2e test
