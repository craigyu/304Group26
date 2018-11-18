const { transaction, Model } = require('objection');
const accountModel = require('../model/accountModel');
const baseController = require('./baseController');


class accountController extends baseController {

  static addAccount() {
    return async (req, res) => {
      let trx;
      try {
        trx = await transaction.start(Model.knex());
        await super.post(accountModel ,req.body, trx);
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

  static getAccountByUserID() {
    return async (req, res) => {
      try {
        const id = req.params.user_id;
        const row = await super.getIndividual(accountModel, id);
        res.status(200).send(row);
      }
      catch (error) {
        res.status(400).send(error);
      }
    }
  }

  static delAccount() {
    return async (req, res) => {
      let trx;
      try {
        trx = await transaction.start(Model.knex());
        const isDeleted = await super.delete(accountModel, req.params.user_id, trx);
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

  static updateAccount() {
    return async (req, res) => {
      let trx;
      try {
        trx = await transaction.start(Model.knex());
        const updated = await super.put(accountModel, req.params.user_id, req.body, trx);
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

module.exports = accountController;