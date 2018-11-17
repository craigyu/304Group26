const Model = require('objection').Model;

class Hotel extends Model {

    static get tableName() {
        return 'hotel';
    }

    static get idColumn() {
        return 'hotel_id';
    }

    // Optional JSON schema. This is not the database schema! Nothing is generated
    // based on this. This is only used for validation. Whenever a model instance
    // is created it is checked against this schema. http://json-schema.org/.
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['amenity_id'],

            properties: {
                amenity_id: { type: 'string' },
                has_weights: { type: 'string', minLength: 3, maxLength: 31 },
                location: { type: 'string', minLength: 5, maxLength: 31 },
            },
        };
    }


}

module.exports = Hotel;
