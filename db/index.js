const dotenv = require('dotenv').config().parsed;
const { Pool, Client } = require('pg');

const pool = new Pool(dotenv);

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
  connect: () => pool.connect()
}