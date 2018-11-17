const Model = require('objection').Model;

class Room extends Model {

    static get tableName() {
        return 'room';
    }

    static get idColumn() {
        return 'room_id';
    }

    // Optional JSON schema. This is not the database schema! Nothing is generated
    // based on this. This is only used for validation. Whenever a model instance
    // is created it is checked against this schema. http://json-schema.org/.
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['room_id', 'price', 'max_guests', 'num_beds'],

            properties: {
                room_id: { type: 'string' },
                price: { type: 'number' },
                max_guests: { type: 'number'},
                bed_type: {type: 'string', enum["Twin", "Queen", "King", "Single"]},
                availability: {type: 'boolean'},
                pets_allowed: {type: 'boolean'},
            },
        };
    }


}

module.exports = Room;
