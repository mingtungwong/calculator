const express = require('express');
const app = express();
const db = require('../db');

const port = 1337;

app.use(express.static("public"));

app.listen(port, () => {
    console.log(`listening on port ${port}`);
    db.query('select * from ascension_costs', (err, res) => {
        console.log(res);
    })
})

app.get('/', (req, res, err) => {
    res.send("Hello");
})