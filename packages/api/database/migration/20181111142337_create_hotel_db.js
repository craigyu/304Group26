
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

      knex.schema.raw('CREATE TABlE "hotel" ' +
          '("hotel_id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(), ' +
          '"name" varchar(31), ' +
          '"location" varchar(31) ) '),

      knex.schema.raw('CREATE TABLE "employees" ' +
          '("worker_id" uuid PRIMARY KEY REFERENCES users(id), ' +
          '"hotel_id" uuid REFERENCES hotel(hotel_id), ' +
          '"position" char(31), ' +
          '"wage" float(53) )' ),
    // create whatever table here, and dont forget it change/add it to the exports.down function at the bottom
      knex.schema.raw('CREATE TABLE "account" ' +
          '("username" varchar(31) PRIMARY KEY not null, ' +
          '"user_id" uuid REFERENCES users(id), ' +
          '"password" varchar(31) not null )')

    ])

};

exports.down = function(knex, Promise) {
  //remove all the tables
  return Promise.all([

      knex.schema.dropTable('employees'),
      knex.schema.dropTable('account'),
      knex.schema.dropTable('hotel'),
      knex.schema.dropTable('users')

    ])
};
