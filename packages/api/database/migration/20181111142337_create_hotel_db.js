
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
          '"password" varchar(31) not null )'),

      knex.schema.raw('CREATE TABLE "room" ' +
          '("room_id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(), ' +
          '"price" float(53), ' +
          '"num_beds" integer, ' +
          '"max_guests" integer, ' +
          '"bedType" varchar(31), ' +
          '"availability" bool default true, ' +
          '"pets_allowed" bool default false )'),

      knex.schema.raw('CREATE TABLE "amenity" ' +
          '("amenity_id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(), ' +
          '"opening" varchar(31), ' +
          '"closing" varchar(31), ' +
          '"rating" int, ' +
          '"type" varchar(31) ) '),

      knex.schema.raw('CREATE TABLE "restaurant" ' +
          '("restaurant_id" uuid PRIMARY KEY REFERENCES amenity(amenity_id), ' +
          '"hasBar" bool default false, ' +
          '"cuisineType" varchar(31), ' +
          '"budget" int )' ),

      knex.schema.raw('CREATE TABLE "spa" ' +
          '("spa_id" uuid PRIMARY KEY REFERENCES amenity(amenity_id), ' +
          '"hasMassage" bool default false, ' +
          '"hasSalon" bool default false, ' +
          '"hasHotTub" bool default false, ' +
          '"hasTanBed" bool default false )' ),

      knex.schema.raw('CREATE TABLE "gym" ' +
          '("gym_id" uuid PRIMARY KEY REFERENCES amenity(amenity_id), ' +
          '"hasWeights" bool default false, ' +
          '"hasPool" bool default false, ' +
          '"hasClass" bool default false, ' +
          '"hasCardio" bool default false )' ),

      //Reservation(reservation.id:Char,  user.id:Char, room.id:Char, hotel.id:Char,
      // isCheckedIn:Bool, isCheckedOut:Bool, has.breakfast:Bool, num.guests:Integer, checkOutDate:Char, checkInDate:char)
      knex.schema.raw('CREATE TABLE "reservation" ' +
          '("res_id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(), ' +
          '"user" uuid REFERENCES users(id), ' +
          '"room" uuid REFERENCES room(room_id), ' +
          '"hotel" uuid REFERENCES hotel(hotel_id), ' +
          '"isCheckedIn" bool default false, ' +
          '"isCheckedOut" bool default false, ' +
          '"has.breakfast" bool default false, ' +
          '"num.guests" int, ' +
          '"checkOutDate" varchar(31) not null, ' +
          '"checkInDate" varchar(31) not null )' )


    ])

};

exports.down = function(knex, Promise) {
  //remove all the tables
  return Promise.all([
      knex.schema.dropTable('reservation'),
      knex.schema.dropTable('gym'),
      knex.schema.dropTable('spa'),
      knex.schema.dropTable('restaurant'),
      knex.schema.dropTable('amenity'),
      knex.schema.dropTable('room'),
      knex.schema.dropTable('employees'),
      knex.schema.dropTable('account'),
      knex.schema.dropTable('hotel'),
      knex.schema.dropTable('users')

    ])
};
