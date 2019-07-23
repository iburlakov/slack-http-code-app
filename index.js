'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const getCodeInfo = require('./src/codeInfoService');

const app = express();

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

app.get('/install', (req,res) => {
    fs.readFile('./install.html', function (err, html) {
        if (err) {
            console.log(`ERROR: ${err}`);

            res.status(500)
        } else {   
            res.writeHeader(200, {"Content-Type": "text/html"});  
            res.write(html);
        }
        res.end(); 
    });
});

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Started at port ${port}`);
});
