const { ERROR } = require("../enum").ERROR;
const { SUCCESS } = require("../enum").SUCCESS;


class Monitor{
    constructor(item){
        this.message = {
            flowId: "FLOW ID - PENDING",
            flowName: "FLOW NAME - PENDING",
            taskName: item.name,
            startTime: "START TIME - PENDING",
            runtime: item.runtime,
            executionTime: "EXECUTIONT TIME - PENDING"
        }
        this.code = {};

        this.log();
    }

    log(){
        console.info(this.message);
    }

}


module.exports = Monitor;
