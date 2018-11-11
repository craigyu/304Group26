const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Knex = require('knex');
const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[environment];
const promiseRouter = require('express-promise-router');
const { Model } = require('objection');

//imports routes
const userRoute = require('./route/userRoute');

// initialize knex
const knex = Knex(config);

// bind all models to a knex instance
Model.knex(knex);

// register API
const router = promiseRouter();

app.use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))

  // prevent CORS errors
  .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();
  })
  .use(router)
  .set('json spaces', 2)

    //use routes
  .use('/user', userRoute)

  // handle errors
  .use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
  })

  .use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    })
  });

const port = process.env.PORT || 5000;

app.listen(port, () => {
// eslint-disable-next-line no-console
  console.log('PunyHotel Backend listening on port ' + port + '!');
});

