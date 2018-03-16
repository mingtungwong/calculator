const router = require('express').Router();
const db = require('../../db');
const utils = require('../utilities');

/**
 * GET Routes
 */

router.get('/data/classes', (req, res, next) => {
    const query = `SELECT * FROM servant_class`;
    utils.handleQuery(query, res, next);
});

/**
 * POST Routes
 */

 router.post('/data/add/class', (req, res, next) => {

 });

module.exports = router;