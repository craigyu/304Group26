const Model = require('objection').Model;
const Knex = require('knex');
const environment = process.env.NODE_ENV || 'development';
const config = require('../../knexfile')[environment];
const knex = Knex(config);

class Users extends Model {
  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }

  $beforeUpdate() {
    this.updated_at = knex.fn.now();
  }
  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['first_name', 'last_name', 'email', 'is_customer', 'password'],

      properties: {
        id: { type: 'string' },
        first_name: { type: 'string', minLength: 1, maxLength: 31 },
        last_name: { type: 'string', minLength: 1, maxLength: 31 },
        address: { type: 'string', maxLength: 255 },
        email: { type: 'email'},
        is_customer: { type: 'boolean'},
        created_at: { type : 'date-time' },
        updated_at: { type : 'date-time' },
        password: { type: 'string', minLength: 5, maxLength: 31 },
      },
    };
  }


}

module.exports = Users;
