const express = require('express');
const app = express.Router();
const axios = require('axios');
const ERROR = require('../enum').ERROR;
const SUCCESS = require('../enum').SUCCESS;

let Flow = require('../services/Flow');
let Task = require('../services/Task');


// *** ASYNC + ERROR HANDLING***

app.get('/healthCheck', async (req, res) => {

})

// Get the sserver status and local flow list
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

// *** ASYNC + ERROR HANDLING***
app.post('/add', async (req, res) => {
    let body = req.body;

    if(body instanceof Object){
        let item = Object.assign({}, body);

        let flowObj = (new Flow(item)).initFlow();

        
        if(!flowObj.isError){
            const flowRes = await startFlow();
            return res.status(200).send(flowRes);
        }
        
        return res.status(500).send(flowObj);
    }
    
});

const startFlow = async () => {
    return new Promise(resolve => {
        self.userid = JSON.parse(sessionStorage.getItem('userDetails'));
        
        // Get the user details from database
        axios.post(`http://localhost:${process.env.EXECUTIVE_PORT}/flo`)
        .then(userResponse => {
            self.setState({ userDetails: userResponse.data, loading: false });
            console.log('Menu was loaded successfully');
            resolve(userResponse.data);
          })
          .catch(error => {
            fetchDataHandleError(error);
          });
      });    
}

module.exports = app;
