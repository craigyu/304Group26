const Model = require('objection').Model;

class Customers extends Model {

    static get tableName() {
        return 'customers';
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
            required: ['user_id', 'paymentType'],

            properties: {
                user_id: { type: 'string' },
                paymentType: { type: 'string', minLength: 5, maxLength: 31 },
            },
        };
    }


}

module.exports = Customers;
