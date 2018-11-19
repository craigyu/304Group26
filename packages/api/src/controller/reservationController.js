const { transaction, Model } = require('objection');
const reservationModel = require('../model/reservationModel');
const roomModel = require('../model/roomModel');
const baseController = require('./baseController');


class reservationController extends baseController {

  static addReservation() {
    return async (req, res) => {
      let trx;
      try {
        trx = await transaction.start(Model.knex());
        const room_id = req.body.room;
        await super.post(reservationModel ,req.body, trx);
        await super.put(roomModel, room_id, {"availability": false}, trx);
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

  static getAllReservation(){
    return async (req, res) => {
      try {
        const rows = await super.get(reservationModel);
          res.status(200).send(rows);
      }
      catch (error) {
        //handle more exceptions
        res.status(400).json({
          error,
        });
      }
    }
  }

  static getReservationByUserID() {
    return async (req, res) => {
      try {
        const id = req.params.id;
        //const row = await super.getIndividual(reservationModel, id);
        const row = await reservationModel.query().where('user_id', id);
        res.status(200).send(row);
      }
      catch (error) {
        res.status(400).send(error);
      }
    }
  }

  static delReservation() {
    return async (req, res) => {
      let trx;
      try {
        trx = await transaction.start(Model.knex());
        const isDeleted = await super.delete(reservationModel, req.params.res_id, trx);
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

  static updateReservation() {
    return async (req, res) => {
      let trx;
      try {
        trx = await transaction.start(Model.knex());
        const updated = await super.put(reservationModel, req.params.res_id, req.body, trx);
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

module.exports = reservationController;