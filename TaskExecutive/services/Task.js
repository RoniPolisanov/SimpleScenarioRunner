const { ERROR } = require("../enum");
const { SUCCESS } = require("../enum");


class Task {
    constructor(item, flow) {

        this.originalTask = JSON.parse(JSON.stringify(item));
        this.formattedTask = {};
        this.originalFlow = flow;
        this.code = {};

        this.initTask();
    }

    initTask() {
        if (this.validateTask() == SUCCESS.VALIDATED) {
            this.code = SUCCESS.VALIDATED;
            return this.createTask();
        }
        return { isError: true, code: this.code, item: this.originalTask };
    }

    // Simple Check task format structure validation
    validateTask() {
        if (this.originalTask) {
            if (!this.originalTask.hasOwnProperty('resolver') && !this.originalTask.hasOwnProperty('name')) {
                this.code = ERROR.TASK_NAME;
                return this.code;
            }
            if (!this.originalTask.hasOwnProperty('next')) {
                this.code = ERROR.TASK_NEXT;
                return this.code;
            }
            if (!this.originalTask.hasOwnProperty('exception')) {
                this.code = ERROR.TASK_EXCEPTION;
                return this.code;
            }
        }

        return SUCCESS.VALIDATED;
    }

    createTask() {
        // Very simple random unique ID generator
        this.formattedTask.name = this.originalTask.resolver || this.originalTask.name;
        this.formattedTask.next = this.originalTask.next;
        this.formattedTask.exception = this.originalTask.exception;
        this.formattedTask.runtime = 0;
        this.formattedTask.flowId = this.originalFlow.flowId;
        this.formattedTask.flowName = this.originalFlow.flowName;
        this.formattedTask.flowStartTime = this.originalFlow.flowStartTime;
        this.formattedTask.flowExecutionTime = this.originalFlow.flowExecutionTime;
    }

    executeTask() {
        return new Promise((resolve) => {
            const runtime = Math.floor(Math.random() * 20);
            this.formattedTask.runtime = runtime;
            setTimeout(() => {
                console.log(`Done execute ${this.formattedTask.name}, with runtime ${this.formattedTask.runtime} seconds`)
                resolve({ isError: false, code: this.code, item: this.formattedTask });
            }, runtime)
        });
    }

}


module.exports = Task;
