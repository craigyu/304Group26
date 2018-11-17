const Model = require('objection').Model;

class Spa extends Model {

    static get tableName() {
        return 'spa';
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
                has_massage: { type: 'boolean' },
                has_salon: { type: 'boolean' },
                has_hot_tub: { type: 'boolean' },
                has_tan_bed: { type: 'boolean' },
            },
        };
    }


}

module.exports = Spa;
