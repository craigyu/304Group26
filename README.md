#The Puny Budapest Hotel

## Backend
###Directory
`cd packages/api`
###Environment 
You will need: 
* [Node.js](https://nodejs.org/en/download/)
* [NPM](https://www.npmjs.com/get-npm)
    *  Node.js comes with NPM so if you downloaded Node you should have NPM, to check you can run `npm --version`
* [Postgres](https://www.postgresql.org/download/) 
    * After installing Postgres you will need to create a database called `hotel`
        * It should have a username `postgres` and a password `postgres`
    * You might want to get a database client to visualize and interact with the DB directly, one option is [Postico](https://eggerapps.at/postico/)

###Setup
* After `cd` into the directory run `npm install`
* For DB migration and seeding:
    *  Migration `knex migrate:rollback && knex migrate:latest`, run this if there's no seed yet
    *  Seeding `knex seed:run`
    *  All together `knex migrate:rollback && knex migrate:latest && knex seed:run`
    *  More about the query builder [Knex](https://knexjs.org/#Builder)

### Start the server
`npm run start` or just `npm start`

###MISC
* Defining models -> [Objection.js](http://vincit.github.io/objection.js/)
* Testing API -> [Postman](https://www.getpostman.com/) or w.e.
