const express = require('express');
const app = express.Router();
const axios = require('axios');
const ERROR = require('../enum').ERROR;
const SUCCESS = require('../enum').SUCCESS;
const TASK_RUNTIME = 9;
const STOP = 'stop';

let Task = require('../services/Task');
let ExceptionFlow = require('../services/ExceptionFlow');

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
        console.log(err.message);
        return res.status(404).send(err);
    }
});

app.post('/schedule', async (req, res) => {
    try {
        let flow = req.body.item;
        
        let item = Object.assign({}, flow.states[`${flow.startAt}`]);
        let exceptionFlow = new ExceptionFlow();

        if (item instanceof Object) {

            // FIRST TASK START POINT - We need to separate between first operation "startAt" field for the reason of flow structure
            let taskObj = new Task(item, flow);
            let executedTask = await taskObj.executeTask();
            await checkError(taskObj, executedTask)
            checkException(executedTask, exceptionFlow);

            // Scheduling each task by 'next' indicator
            while (item.next !== STOP) {
                item = Object.assign({}, flow.states[`${item.next}`]);

                if (item instanceof Object) {

                    taskObj = new Task(item, flow);
                    executedTask = await taskObj.executeTask();

                    await checkError(taskObj, executedTask)
                    checkException(executedTask, exceptionFlow);

                }
            }

            let temp_ef = exceptionFlow.getFlow();
            if (temp_ef.startAt) {
                await dispatchExceptionFlow(temp_ef);
            }

            return res.status(200).send({ message: "The flow, including the tasks was sheduled successfully" });
        }

        return res.status(500).send(req.body);
    }

    catch (err) {
        console.log(err.message);
        return res.status(404).send(err);
    }
});

const dispatch = async (taskObj) => {
    return new Promise(resolve => {
        axios.post(`${process.env.HOST_NAME}:${process.env.MONITOR_PORT}/monitor/task`, taskObj.item)
            .then(response => {
                console.info(`[*] ${taskObj.item.name} was scheduld successfully [*]`);
                resolve(response);
            })
            .catch(err => {
                console.log(err.message);
            });
    });
}

const checkException = (executedTask, exceptionFlow) => {
    if (executedTask.item.runtime > TASK_RUNTIME) {

        exceptionFlow.addTask(JSON.parse(JSON.stringify(executedTask)));
        console.log(`[*] ${executedTask.item.name} added to exception flow [*]`);
    }
}

const checkError = async (taskObj, executedTask) => {
    if (!taskObj.isError) {
        return await dispatch(executedTask);
    }
    console.log(`[*] Error in ${executedTask.item.name} structure [*]`);
}

const dispatchExceptionFlow = async (exceptionFlow) => {
    console.log("Starting the exception flow");    

    let item = Object.assign({}, exceptionFlow.states[`${exceptionFlow.startAt}`]);
    let taskObj = new Task(item, exceptionFlow);
    let executedTask = await taskObj.executeTask();

    await dispatch(executedTask);

    while (executedTask.item.next != STOP) {
        item = Object.assign({}, exceptionFlow.states[`${item.next}`]);

        if (item instanceof Object) {

            taskObj = new Task(item, exceptionFlow);
            executedTask = await taskObj.executeTask();
            await dispatch(executedTask);

        }
    }
    console.log("Fine the exception flow");    

}

module.exports = app;
