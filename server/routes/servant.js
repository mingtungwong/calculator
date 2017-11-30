const router = require('express').Router();
const db = require('../../db');

router.get('/servant', (req, res, next) => {
    db.query('select * from servant', (err, result) => {
        console.log(result);
        res.send(result.rows);
    })
})

module.exports = router;