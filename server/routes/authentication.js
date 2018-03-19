const router = require('express').Router();
const db = require('../../db');
const utils = require('../utilities');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * POST routes
 */

 router.post('/signup', (req, res, next) => {
    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const query = `INSERT INTO users (email, password) VALUES ('${email}', '${hashedPassword}') RETURNING email, admin;`;
    utils.handleDBTransaction(res, query, (res, rows, error) => {
        if(error) res.sendStatus(500);
        else {
            const obj = rows[0];
            const  { email, admin } = obj;
            const token = jwt.sign({ email, admin }, process.env.jwtSecret);
            res.json({ token });
        }
    })
 })

module.exports = router;