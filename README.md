Kitch
=========

Prerequisites
--------

- PostgreSQL installed, easiest way on mac is use [Postgres93.app](http://postgresapp.com/)
- create login role in Postgre named `fduser`
- start postgres before running app
- install dependencies using `npm install`

Migrations
--------

To run migrations, run `db-migrate up`
Migrations can also be run in reverse using `db-migrate down`


Postgre Settings
--------

There are 2 different environments available `dev` and `prod`.
Settings are stored in database.json
By default dev environment settings use:
- user: fduser
- password: <none>
- host: localhost
- port: 5432
- database: fd_test

and prod settings use:
- user: from environment variable PG_USERNAME
- password: from environment variable PG_PASSWORD
- host: from environment variable PG_SERVER
- port: 5432
- database: fd

To run the app using prod settings just include `--prod` on the command line. Ex: `node app.js --prod`

