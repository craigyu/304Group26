const { transaction, Model } = require('objection');
const hotelModel = require('../model/hotelModel');
const baseController = require('./baseController');


class hotelController extends baseController {

  static addHotel() {
    return async (req, res) => {
      let trx;
      try {
        trx = await transaction.start(Model.knex());
        await super.post(hotelModel ,req.body, trx);
        await trx.commit();
        res.sendStatus(201);
      } catch (error) {
        //handle more exceptions
        await trx.rollback();
        res.status(400).json({
          error,
        });
      }
    };
  }

  static getHotelByID() {
    return async (req, res) => {
      try {
        const id = req.params.hotel_id;
        const row = await super.getIndividual(hotelModel, id);
        res.status(200).send(row);
      }
      catch (error) {
        res.status(400).send(error);
      }
    }
  }

  static delHotel() {
    return async (req, res) => {
      let trx;
      try {
        trx = await transaction.start(Model.knex());
        const isDeleted = await super.delete(hotelModel, req.params.hotel_id, trx);
        await trx.commit();
        if (isDeleted) {
          res.sendStatus(200);
        }
        else {
          res.sendStatus(404);
        }
      }
      catch (error) {
        await trx.rollback();
        res.status(400).json({
          error,
        });
      }
    }
  }

  static updateHotel() {
    return async (req, res) => {
      let trx;
      try {
        trx = await transaction.start(Model.knex());
        const updated = await super.put(hotelModel, req.params.hotel_id, req.body, trx);
        await trx.commit();
        if (!updated) {
          res.sendStatus(404);
        }
        else {
          res.status(200).send(updated);
        }
      }
      catch (error) {
        await trx.rollback();
        res.status(400).send(error);
      }
    }
  }

}

module.exports = hotelController;