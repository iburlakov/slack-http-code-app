'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const dotEnv = require('dotenv');
const cors = require('cors');

const codes = require('./data/codes.json');

dotEnv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/api/codeinfo', (req, res) => {
    let code = req.body.text;
    let codeInfo = codes.find(el => el.code == code);

    let replyMessage;
    if (false == /^\d{3}$/.test(code) || codeInfo == undefined) {
        res.send({
            text: `${code} is not a valid HTTP status code, try 200 for instance`
        });
    } else {
        res.send( {
            text: `*${code}* - ${codeInfo.desc}`,
            attachments:
            [
                { text: `https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${code}` }
            ]
        });
    }
});

app.listen(3001, () => {
    console.log("started...");
});
