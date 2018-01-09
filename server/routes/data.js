const router = require('express').Router();
const db = require('../../db');
const utils = require('../utilities');

router.get('/data/classes', (req, res, next) => {
    const query = `SELECT * FROM servant_class`;
    utils.handleQuery(query, res, next);
});

module.exports = router;