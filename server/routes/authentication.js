const router = require('express').Router();
const db = require('../../db');
const utils = require('../utilities');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    const query = `SELECT password, admin FROM users WHERE email = '${email}';`;

    db.query(query, (error, result) => {
        if(error) next(error);
        if(!result.rows.length) res.sendStatus(500);
        else {
            const hashedPassword = result.rows[0].password;
            const admin = result.rows[0].admin;
            const matching = bcrypt.compareSync(password, hashedPassword);
            if(matching) {
                const token = jwt.sign({ email, admin }, process.env.jwtSecret);
                res.send({ token, admin });
            } else res.sendStatus(500);
        }
    })
})

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