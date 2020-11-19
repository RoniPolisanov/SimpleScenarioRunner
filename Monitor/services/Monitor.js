const { ERROR } = require("../enum").ERROR;
const { SUCCESS } = require("../enum").SUCCESS;


class Monitor {
    constructor(item) {
        this.message = {
            task_state_name: item.name,
            task_runtime: item.runtime,
            flow_id: item.flowId,
            flow_name: item.flowName,
            flow_start_ime: item.flowStartTime,
            flow_total_execution_time: new Date().getTime() - item.flowStartTime
        }

        this.code = {};

        this.log();
    }

    log() {
        console.info(this.message);
    }

}


module.exports = Monitor;
