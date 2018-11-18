const Model = require('objection').Model;

class Amenity extends Model {

    static get tableName() {
        return 'amenity';
    }

    static get idColumn() {
        return 'amenity_id';
    }

    // Optional JSON schema. This is not the database schema! Nothing is generated
    // based on this. This is only used for validation. Whenever a model instance
    // is created it is checked against this schema. http://json-schema.org/.
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['opening', 'closing', 'type'],

            properties: {
                amenity_id: { type: 'string' },
                opening: { type: 'string', minLength: 3, maxLength: 31 },
                closing: { type: 'string', minLength: 5, maxLength: 31 },
                rating: { type: 'number'},
                type: { type: 'string', enum: ["spa", "gym", "restaurant" ] }
            },
        };
    }


}

module.exports = Amenity;
