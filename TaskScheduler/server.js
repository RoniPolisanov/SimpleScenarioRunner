const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.SCHEDULER_PORT;
const cors = require('cors');
let FlowController = require('./conrollers/Flow.ctrl');

var rawBodySaver = (req, res, buf, encoding) => {
    if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || 'utf8');
    }
}

app.set('port', port);
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', verify: rawBodySaver, extended: true }));
app.use(bodyParser.text());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept");
    next();
});

app.use('/flow', FlowController);

app.all('*', (req, res, next) => {
    res.status(404).send({ "Message": `This page was not found` });
    next();
});


app.listen(port, () => {
    console.debug(`Listening on port ${port}`);
});
