
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
      '"password" varchar(31) not null, ' +
      '"created_at" timestamptz DEFAULT NOW(), ' +
      '"updated_at" timestamptz DEFAULT NOW())'),

      knex.schema.raw('CREATE TABlE "hotel" ' +
          '("hotel_id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(), ' +
          '"name" varchar(31), ' +
          '"location" varchar(31) ) '),

      knex.schema.raw('CREATE TABLE "employee" ' +
          '("user_id" uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE, ' +
          '"hotel_id" uuid REFERENCES hotel(hotel_id), ' +
          '"position" char(31), ' +
          '"wage" float(53) )' ),
    // create whatever table here, and dont forget it change/add it to the exports.down function at the bottom

      knex.schema.raw('CREATE TABLE "room" ' +
          '("room_id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(), ' +
          '"hotel_id" uuid REFERENCES hotel(hotel_id), ' +
          '"price" float(53), ' +
          '"num_beds" integer, ' +
          '"max_guests" integer, ' +
          '"bed_type" varchar(31), ' +
          '"availability" bool default true, ' +
          '"pets_allowed" bool default false )'),

      knex.schema.raw('CREATE TABLE "amenity" ' +
          '("amenity_id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(), ' +
          '"opening" varchar(31), ' +
          '"closing" varchar(31), ' +
          '"rating" int, ' +
          '"type" varchar(31) ) '),

      knex.schema.raw('CREATE TABLE "restaurant" ' +
          '("amenity_id" uuid PRIMARY KEY REFERENCES amenity(amenity_id), ' +
          '"has_bar" bool default false, ' +
          '"cuisine_type" varchar(31), ' +
          '"budget" int )' ),

      knex.schema.raw('CREATE TABLE "spa" ' +
          '("amenity_id" uuid PRIMARY KEY REFERENCES amenity(amenity_id), ' +
          '"has_massage" bool default false, ' +
          '"has_salon" bool default false, ' +
          '"has_hot_tub" bool default false, ' +
          '"has_tan_bed" bool default false )' ),

      knex.schema.raw('CREATE TABLE "gym" ' +
          '("amenity_id" uuid PRIMARY KEY REFERENCES amenity(amenity_id), ' +
          '"has_weights" bool default false, ' +
          '"has_pool" bool default false, ' +
          '"has_class" bool default false, ' +
          '"has_cardio" bool default false )' ),

    //add customer table
    knex.schema.raw('CREATE TABLE "customer" ' +
      '("user_id" uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE, ' +
      '"expire_month" char(31), ' +
      '"expire_year" char(31), ' +
      '"card_number" char(31), ' +
      '"cvc" char(31), ' +
      '"payment_method" char(31))' ),

      //Reservation(reservation.id:Char,  user.id:Char, room.id:Char, hotel.id:Char,
      // isCheckedIn:Bool, isCheckedOut:Bool, has.breakfast:Bool, num.guests:Integer, checkOutDate:Char, checkInDate:char)
      knex.schema.raw('CREATE TABLE "reservation" ' +
          '("reservation_id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(), ' +
          '"user_id" uuid REFERENCES users(id) ON DELETE SET NULL, ' +
          '"room" uuid REFERENCES room(room_id), ' +
          '"hotel" uuid REFERENCES hotel(hotel_id), ' +
          '"is_checked_in" bool default false, ' +
          '"is_checked_out" bool default false, ' +
          '"has_breakfast" bool default false, ' +
          '"num_guests" int, ' +
          '"check_out_date" timestamptz not null, ' +
          '"check_in_date" timestamptz not null )' )
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
      knex.schema.dropTable('employee'),
      knex.schema.dropTable('hotel'),
      knex.schema.dropTable('customer'),
      knex.schema.dropTable('users'),

    ])
};
