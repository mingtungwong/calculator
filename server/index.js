const express = require('express');
const app = express();
const db = require('../db');

const port = 1337;

app.use(express.static("public"));
app.use(require('./routes'));

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

app.get('/', (req, res, err) => {
    res.send("Hello");
})