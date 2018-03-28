const express = require('express');
const app = express();
const db = require('../db');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const port = 1337;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));
app.use('/api', require('./routes'));

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

app.get('/', (req, res, err) => {
    res.send("Hello");
})

app.use((err, req, res, next) => console.error(err));