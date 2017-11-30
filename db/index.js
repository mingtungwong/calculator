const dotenv = require('dotenv').config().parsed;
const { Pool, Client } = require('pg');

const pool = new Pool(dotenv);

// pool.query('select * from ascension_qp_cost where servant_stars = 1', (err, res) => {
//     let rows = res.rows;
//     for(row of rows) {
//       console.log(row);
//     }
//     pool.end()
// });

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
}