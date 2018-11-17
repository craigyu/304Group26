const Model = require('objection').Model;

class Gym extends Model {

    static get tableName() {
        return 'gym';
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
                has_weights: { type: 'boolean'},
                has_pool: { type: 'boolean'},
                has_class: { type: 'boolean'},
                has_cardio: { type: 'boolean'},
            },
        };
    }


}

module.exports = Gym;
