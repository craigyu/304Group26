let csv = require('csvtojson');
const knex = require('knex');

function insertCsvIntoTable(knex, tableName, fromFile) {
  return new Promise(resolve => {
    knex(tableName).del()
      .then(function () {
        return csv().fromFile(fromFile)
          .then((jsonBlob) => {
            let jsonObject = JSON.stringify(jsonBlob, function (key, value) {
              return value.length === 0 ? null : value
            });
            return knex(tableName).insert(JSON.parse(jsonObject)).then(() => {
              //console.log("resolved");
              resolve();
            });
          });
      });
  });
}



exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  let BASEURL = __dirname + '/seedData/';
  let seeds = [
      { tableName: 'users', fileName: BASEURL + 'user.csv'},
      { tableName: 'hotel', fileName: BASEURL + 'hotel.csv' },
      { tableName: 'amenity', fileName: BASEURL + 'amenity.csv' },
      { tableName: 'employee', fileName: BASEURL + 'employee.csv'},
      { tableName: 'customer', fileName: BASEURL + 'customer.csv' },
      { tableName: 'spa', fileName: BASEURL + 'spa.csv'},
      { tableName: 'gym', fileName: BASEURL + 'gym.csv'},
      { tableName: 'restaurant', fileName: BASEURL + 'restaurant.csv' },
      { tableName: 'room', fileName: BASEURL + 'room.csv' },
      //{ tableName: 'reservation', fileName: BASEURL + 'reservation.csv' },



  ];
  let migration = [];

  seeds.forEach(function (seed) {
    // console.log("Table name:"+seed.tableName + " File name:"+seed.fileName);
    migration.push(insertCsvIntoTable(knex, seed.tableName, seed.fileName))
  });

  return Promise.all(migration).then(() => {

  });

};


