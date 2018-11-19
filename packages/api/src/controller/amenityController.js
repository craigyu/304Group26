const { transaction, Model } = require('objection');
const amenityModel = require('../model/amenityModel');
const baseController = require('./baseController');


class amenityController extends baseController {

  static addAmenity() {
    return async (req, res) => {
      let trx;
      try {
        trx = await transaction.start(Model.knex());
        await super.post(amenityModel ,req.body, trx);
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

  static getAmenityByHotelID() {
    return async (req, res) => {
      try {
        const id = req.params.id;
        const row = await amenityModel.query().where('hotel_id', id);
        res.status(200).send(row);
      }
      catch (error) {
        res.status(400).send(error);
      }
    }
  }

  static delAmenity() {
    return async (req, res) => {
      let trx;
      try {
        trx = await transaction.start(Model.knex());
        const isDeleted = await super.delete(amenityModel, req.params.amenity_id, trx);
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

  static updateAmenity() {
    return async (req, res) => {
      let trx;
      try {
        trx = await transaction.start(Model.knex());
        const updated = await super.put(amenityModel, req.params.amenity_id, req.body, trx);
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

module.exports = amenityController;