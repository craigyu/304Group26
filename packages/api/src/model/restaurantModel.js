const Model = require('objection').Model;

class Restaurant extends Model {

    static get tableName() {
        return 'restaurant';
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
            required: ['amenity_id'],

            properties: {
                amenity_id: { type: 'string' },
                has_bar: { type: 'boolean' },
                cuisine_type: { type: 'string', enum: ["Mexican", "Korean", "Cubano", "Venezulean", "Chinese", "American"] },
                budget: { type: 'number' },
            },
        };
    }


}

module.exports = Restaurant;
