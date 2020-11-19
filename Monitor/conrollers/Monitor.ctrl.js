const express = require('express');
const app = express.Router();
const axios = require('axios');
const ERROR = require('../enum').ERROR;
const SUCCESS = require('../enum').SUCCESS;

let Monitor = require('../services/Monitor');

// Get the server status
app.get('/status', async (req, res) => {
    try {
        let example = {
            up_time: Math.floor(process.uptime())
        };

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        res.end(JSON.stringify(example));
    }

    catch (err) {
        console.log(err);
        return res.status(404).send(err);
    }
});

app.post('/task', async (req, res) => {
    try {
        let item = req.body;

        new Monitor(item);

        return res.status(200).send(item);

    }

    catch (err) {
        console.log(err);
        return res.status(404).send(err);
    }
});


module.exports = app;
