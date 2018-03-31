const router = require('express').Router();
const db = require('../../db');

/**
 * GET Routes
 */

router.get('/', (req, res, next) => {
    const query = `
        SELECT id, name
        FROM item
        ORDER BY id ASC
    `

    db.query(query, (error, result) => {
        if(error) next(error);
        else if(!result) next(new Error("No results"));
        else res.send(result.rows);
    });
})

/**
 * POST Routes
 */

router.post('/add', (req, res, next) => {

})

module.exports = router;