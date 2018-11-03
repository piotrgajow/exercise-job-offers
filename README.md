# Exercise - job offers

Exercise - Backend for job offer posting service

## Using & developing the app

###### Installation

Application requires MySQL database server.
By default it connects to local MySQL instance using user `root`, no password and existing database `job_offers`. Different connection parameters require proper changes in `app.module.ts` file (`dataSourceConfiguration` constant).

```bash
$ npm install
```

###### Running
```bash
# development
$ npm run start

# production mode
$ npm run start:prod
```

###### Testing
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Tech stack

### MySQL database

<a href="https://dev.mysql.com/downloads/mysql/5.7.html#downloads">MySQL 5.7 Server</a>

### Nest.js

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

  Nest is [MIT licensed](LICENSE).
