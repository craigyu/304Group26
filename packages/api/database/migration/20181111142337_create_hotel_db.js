
exports.up = async function(knex, Promise) {
  //Add all the tables for DB
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  return Promise.all([
    // knex.schema.createTable('farm', function (table) {
    //   table.uuid('farm_id').primary().defaultTo(knex.raw('uuid_generate_v1()'));
    //   table.string('farm_name').notNullable();
    //   table.string('address');
    //   table.jsonb('phone_number');
    //   table.jsonb('units').defaultTo(JSON.stringify({
    //     measurement: 'metric',
    //     currency: 'CAD',
    //     date_format: 'MM/DD/YY',
    //   }));
    // }),

    knex.schema.raw('CREATE TABLE "users" ' +
      '("id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(), ' +
      '"first_name" varchar(31) not null, ' +
      '"last_name" varchar(31) not null, ' +
      '"email" text NOT NULL unique, ' +
      '"address" varchar(255), ' +
      '"is_customer" bool default true, ' +
      '"created_at" timestamptz DEFAULT NOW(), ' +
      '"updated_at" timestamptz DEFAULT NOW())')
    ])

};

exports.down = function(knex, Promise) {
  //remove all the tables
  return Promise.all([
    knex.schema.dropTable('users'),
    ])
};
