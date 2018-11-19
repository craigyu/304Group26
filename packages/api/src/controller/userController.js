const { transaction, Model } = require('objection');
const userModel = require('../model/userModel');
const baseController = require('./baseController');


class userController extends baseController {

  static addUser() {
    return async (req, res) => {
      let trx;
      try {
        trx = await transaction.start(Model.knex());
        const result = await super.postWithResponse(userModel, req.body, trx);
        await trx.commit();
        res.status(201).send(result);
      } catch (error) {
        //handle more exceptions
        await trx.rollback();
        res.status(400).json({
          error,
        });
      }
    };
  }

  static getUserByID() {
    return async (req, res) => {
      try {
        const id = req.params.id;
        const row = await super.getIndividual(userModel, id);
        res.status(200).send(row);
      }
      catch (error) {
        res.status(400).send(error);
      }
    }
  }

  static getUserByEmail() {
    return async (req, res) => {
      try {
        const id = req.params.id;
        const row = await userModel.query().where('email', id);
        if(!row.length){
          res.sendStatus(404);
        }
        else res.status(200).send(row);
      }
      catch (error) {
        res.status(400).send(error);
      }
    }
  }

  static delUser() {
    return async (req, res) => {
      let trx;
      try {
        trx = await transaction.start(Model.knex());
        const isDeleted = await super.delete(userModel, req.params.id, trx);
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

  static updateUser() {
    return async (req, res) => {
      let trx;
      try {
        trx = await transaction.start(Model.knex());
        const updated = await super.put(userModel, req.params.id, req.body, trx);
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

module.exports = userController;