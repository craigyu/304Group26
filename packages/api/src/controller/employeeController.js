const { transaction, Model } = require('objection');
const employeeModel = require('../model/employeeModel');
const baseController = require('./baseController');


class employeeController extends baseController {

  static addEmployee() {
    return async (req, res) => {
      let trx;
      try {
        trx = await transaction.start(Model.knex());
        await super.post(employeeModel ,req.body, trx);
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

  static getEmployeeByID() {
    return async (req, res) => {
      try {
        const id = req.params.id;
        const row = await super.getIndividual(employeeModel, id);
        res.status(200).send(row);
      }
      catch (error) {
        res.status(400).send(error);
      }
    }
  }

  static delEmployee() {
    return async (req, res) => {
      let trx;
      try {
        trx = await transaction.start(Model.knex());
        const isDeleted = await super.delete(employeeModel, req.params.user_id, trx);
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

  static updateEmployee() {
    return async (req, res) => {
      let trx;
      try {
        trx = await transaction.start(Model.knex());
        const updated = await super.put(employeeModel, req.params.id, req.body, trx);
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

module.exports = employeeController;