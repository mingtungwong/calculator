const router = require('express').Router();
const db = require('../../db');
const utils = require('../utilities');

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
    const query = `INSERT INTO servant_class (name) VALUES ('${className}');`;
    utils.handleDBTransaction(res, query, utils.simpleDBTransactionResponseHandler);
 });

module.exports = router;