
const host = 'http://localhost:5000/';
const api = {
  host: 'http://localhost:5000/',
  user: host + 'user',
  hotel: host + 'hotel',
  customer: host+ 'customer',
  employee: host + 'employee',
  spa: host + 'spa',
  room: host + 'room',
  reservation: host + 'reservation',
  amenity: host + 'amenity',
  headers: {
    'Content-Type': 'application/json'
  },
};

module.exports = api;
