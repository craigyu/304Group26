
const host = 'http://localhost:5000/';
const api = {
  user: host + 'user',
  hotel: host + 'hotel',
  customer: host+ 'customer',
  employee: host + 'employee',
  headers: {
    'Content-Type': 'application/json'
  },
};

module.exports = api;
