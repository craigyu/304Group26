const Model = require('objection').Model;

class Reservation extends Model {

    static get tableName() {
        return 'reservation';
    }

    static get idColumn() {
        return 'res_id';
    }

    // Optional JSON schema. This is not the database schema! Nothing is generated
    // based on this. This is only used for validation. Whenever a model instance
    // is created it is checked against this schema. http://json-schema.org/.
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['res_id', 'user_id', 'room_id', 'hotel_id'],

            properties: {
                res_id: { type: 'string' },
                user_id: { type: 'string' },
                room_id: { type: 'string' },
                hotel_id: { type: 'string' },
                is_checked_in: { type: 'boolean' },
                is_checked_out: { type: 'boolean' },
                has_breakfast: { type: 'boolean' },
                num_guests: { type: 'number' },
                check_in_date: { type: 'date-time' },
                check_out_date: { type: 'date-time' },
            },
        };
    }


}

module.exports = Reservation;
