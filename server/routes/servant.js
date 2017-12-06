const router = require('express').Router();
const db = require('../../db');
const utils = require('../utilities');

router.get('/servant/:id', (req, res, next) => {
    const query = `
        SELECT servant.id, servant.name, servant_class.name AS class, servant.stars
        FROM servant INNER JOIN servant_class ON servant.class_id = servant_class.id
        WHERE servant.id = ${req.params.id}
    `
    utils.handleQuery(query, res, next);
});

router.get('/servant', (req, res, next) => {
    const query = `
        SELECT servant.id, servant.name, servant_class.name AS class, servant.stars
        FROM servant INNER JOIN servant_class ON servant.class_id = servant_class.id
        ORDER BY servant.id ASC
    `;
    utils.handleQuery(query, res, next);
});

router.get('/servant/basic', (req, res, next) => {
    const query = `
        SELECT id, name
        FROM servant
        ORDER BY name ASC
    `;
    utils.handleQuery(query, res, next);
})

router.get('/servant/cost/:servant_id', (req, res, next) => {
    const servantQuery = `
        SELECT servant.id, servant.name, servant_class.name AS class, servant.stars
        FROM servant INNER JOIN servant_class ON servant.class_id = servant_class.id
        WHERE servant.id = ${req.params.servant_id}
    `;
    const costQuery = `
        SELECT servant.name, ascension_costs.ascension_level, item.id, item.name AS item, ascension_costs.quantity
        FROM servant INNER JOIN ascension_costs ON servant.id = ascension_costs.servant_id INNER JOIN item ON ascension_costs.item_id = item.id
        WHERE servant.id = ${req.params.servant_id}
    `;

    const servantObject = {};

    db.query(servantQuery, (error, result) => {
        if(error) next(error);
        else if(!result) next(new Error("No results"));
        else {
            servantObject.profile = result.rows[0];
            db.query(costQuery, (error, result) => {
                if(error) next(error);
                else if(!result) next(new Error("No results"));
                else {
                    const ascLevels = [];
                    for(let row of result.rows) {
                        if(!ascLevels[row.ascension_level]) ascLevels[row.ascension_level] = [];
                        ascLevels[row.ascension_level].push({id: row.id, item: row.item, quantity: row.quantity});
                    }
                    for(let level of ascLevels) {
                        if(level) {
                            while(level.length < 5)
                                level.push(' ');
                        }
                    }
                    servantObject.costs = ascLevels;
                    res.send(servantObject);
                }
            });
        }
    });
});

router.post('/servant/cost', (req, res, next) => {
    (async () => {
        const client = await db.connect();
        try {
            await client.query('BEGIN');
            const queryText = `
                INSERT into ascension_costs (servant_id, ascension_level, item_id, quantity) VALUES
                (50, 1, 1, 1)
            `
            await client.query(queryText);
            await client.query('COMMIT');
        } catch(e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
            res.sendStatus(200);
        }
    })();
})

module.exports = router;