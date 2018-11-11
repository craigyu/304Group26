// Update with your config setticonst knex = require('knex')('production')ngs.

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      database: 'hotel',
      user:     'postgres',
      password: 'postgres',
    },
    migrations: {
      directory: __dirname + '/database/migration',
    },
    seeds: {
      directory: __dirname + '/database/seed',
    },
  }
};
