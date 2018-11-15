
exports.up = async function(knex, Promise) {
  //Add all the tables for DB
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  return Promise.all([
    knex.schema.raw('CREATE TABLE "users" ' +
      '("id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(), ' +
      '"first_name" varchar(31) not null, ' +
      '"last_name" varchar(31) not null, ' +
      '"email" text NOT NULL unique, ' +
      '"address" varchar(255), ' +
      '"is_customer" bool default true, ' +
      '"created_at" timestamptz DEFAULT NOW(), ' +
      '"updated_at" timestamptz DEFAULT NOW())'),

    // create whatever table here, and dont forget it change/add it to the exports.down function at the bottom
    knex.schema.raw('CREATE TABLE "account"'),

    ])

};

exports.down = function(knex, Promise) {
  //remove all the tables
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('account'),
    ])
};
