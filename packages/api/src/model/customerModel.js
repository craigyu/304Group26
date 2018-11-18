const Model = require('objection').Model;

class Customer extends Model {

  static get tableName() {
    return 'customer';
  }

  static get idColumn() {
    return 'user_id';
  }

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'expire_month', 'expire_year', 'cvc', 'card_number', 'payment_method'],

      properties: {
        user_id: { type: 'string' },
        expire_month: { type: 'string' },
        expire_year: { type: 'string' },
        cvc: { type: 'string' },
        card_number: { type: 'string' },
        payment_method: { type: 'string' , enum:['visa', 'mastercard', 'american express']},
      },
    };
  }


}

module.exports = Customer;
