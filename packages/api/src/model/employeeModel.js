const Model = require('objection').Model;

class Employee extends Model {

  static get tableName() {
    return 'employee';
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
      required: ['user_id', 'hotel_id', 'position', 'wage'],

      properties: {
        user_id: { type: 'string' },
        hotel_id: { type: 'string' },
        position: { type: 'string', enum: ["Cleaner", "Receptionist", "Concierge", "Chef", "Shift Leader", "Clerk", "Valet"]},
        wage: {type: 'number' }
      },
    };
  }


}

module.exports = Employee;
