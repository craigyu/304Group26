const {transaction, Model} = require('objection');
const hotelModel = require('../model/hotelModel');
const roomModel = require('../model/roomModel');
const baseController = require('./baseController');
const pg = require('pg');

const Knex = require('knex');
const environment = process.env.NODE_ENV || 'development';
const config = require('../../knexfile')[environment];
const knex = Knex(config);


class hotelController extends baseController {

  static demoJoin() {
    return async (req, res) => {
      try {
        const row = await knex.table('hotel').innerJoin('amenity', 'hotel.hotel_id', '=', 'amenity.hotel_id');
        res.status(200).send(row);
      }
      catch (error) {
        res.status(400).send(error);
      }
    }
  }

  static demoView() {
    return async (req, res) => {
      try {
        // let connectionString = "postgres://postgres:postgres@mock_farm/ip:5432/hotel";
        // let pgClient = new pg.Client(connectionString);
        // pgClient.connect();
        await knex.raw(
          `
          CREATE VIEW room_available AS
          SELECT price, num_beds, max_guests, bed_type, pets_allowed
          FROM room
          WHERE availability = TRUE;
          `
        );
        const row = await knex('room_available').select('*');
        res.status(200).send(row);
      }
      catch (error) {
        res.status(400).send(error);
      }
    }
  }


  static demoGroup() {
    return async (req, res) => {
      try {
        const row = await knex('users').count(knex.raw('??', ['is_customer']));
        res.status(200).send(row);
      }
      catch (error) {
        res.status(400).send(error);
      }
    }
  }

  static demoDivision() {
    return async (req, res) => {
      try {
        const row = await knex.raw(`
        SELECT U.email
      FROM users U
      WHERE NOT EXISTS
	    ((SELECT H.hotel_id
	      FROM hotel H)
	    EXCEPT
	    (SELECT R.hotel
	    FROM reservation R 
	    WHERE R.user_id = U.id))
        `);
        res.status(200).send(row);
      }
      catch (error) {
        res.status(400).send(error);
      }
    }
  }


}

module.exports = hotelController;