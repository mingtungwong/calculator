const router = require('express').Router();
const db = require('../../db');
const utils = require('../utilities');
const jwt = require('jsonwebtoken');

/**
 * GET Routes
 */

router.get('/classes', (req, res, next) => {
    const query = `SELECT * FROM servant_class`;
    utils.handleQuery(query, res, next);
});

/**
 * POST Routes
 */

 router.post('/add/class', (req, res, next) => {
    const { className } = req.body;
    if(!req.headers.authorization) res.sendStatus(500);
    else {
        try {
            const token = req.headers.authorization;
            const obj = jwt.verify(token, process.env.jwtSecret);
            if(obj.admin) {
                const query = `INSERT INTO servant_class (name) VALUES ('${className}');`;
                utils.handleDBTransaction(res, query, utils.simpleDBTransactionResponseHandler);
            } else res.sendStatus(500);
        }
        catch(error) {
            res.sendStatus(500);
        }
    }
 });

module.exports = router;