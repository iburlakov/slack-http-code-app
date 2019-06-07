'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const dotEnv = require('dotenv');
const cors = require('cors');

//const codes = require('./data/codes.json');

const getCodeInfo = require('./src/codeInfoService');

dotEnv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/api/code', (req, res) => {
    console.log(`Got command: ${JSON.stringify(req.body)}`);

    getCodeInfo(req.body.text)
        .then(message => {
            console.log(`OK: ${JSON.stringify(message)}`);

            res.send(message);
        })
        .catch(error => {
            console.log(`ERROR: ${error}`);

            res.send(error).status(500);
        })
});

app.listen(3001, () => {
    console.log(`started at port 3001`);
});
