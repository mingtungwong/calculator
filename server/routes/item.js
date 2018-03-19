const router = require('express').Router();
const db = require('../../db');

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

module.exports = router;