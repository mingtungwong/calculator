const router = require('express').Router();
const db = require('../../db');

router.get('/servant', (req, res, next) => {
    const query = `
        SELECT servant.id, servant.name, servant_class.name AS class, servant.stars
        FROM servant INNER JOIN servant_class ON servant.class_id = servant_class.id
        ORDER BY servant.id ASC
    `;
    db.query(query, (error, result) => {
        res.send(result.rows);
    })
})

router.get('/servant/cost/:servant_id', (req, res, next) => {
    const query = `
        SELECT servant.name, ascension_costs.ascension_level, item.name AS item, ascension_costs.quantity
        FROM servant INNER JOIN ascension_costs ON servant.id = ascension_costs.servant_id INNER JOIN item ON ascension_costs.item_id = item.id
        WHERE servant.id = ${req.params.servant_id}
    `;
    db.query(query, (error, result) => {
        if(error) next(error);
        else if(!result) next(new Error("No results"));
        else res.send(result.rows);
    });
})

module.exports = router;