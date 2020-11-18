const ERROR = require('../enum').ERROR;
const SUCCESS = require('../enum').SUCCESS;

class Flow {
    constructor(item) {
        // Original flow paper (JSON)
        this.originalFlow = JSON.parse(JSON.stringify(item));
        this.formattedFlow = {};
        this.code = {};
    }

    // *** ERROR HANDLING***
    // Initialize the flow
    initFlow() {
        if (this.validateFlow() == SUCCESS.VALIDATED) {
            this.code = SUCCESS.VALIDATED;
            return this.createFlow();
        }
        return { isError: true, code: this.code, item: this.originalFlow };
    }

    // *** ERROR HANDLING***
    // Simple Check flow format structure validation
    validateFlow() {
        if (this.originalFlow) {
            if (!this.originalFlow.hasOwnProperty('flow')) {
                this.code = ERROR.FLOW_NAME;
                return this.code;
            }
            if (!this.originalFlow.hasOwnProperty('comment')) {
                this.code = ERROR.FLOW_COMMENT;
                return this.code;
            }
            if (!this.originalFlow.hasOwnProperty('startAt')) {
                this.code = ERROR.FLOW_START_P;
                return this.code;
            }
            if (!this.originalFlow.hasOwnProperty('states') && !this.originalFlow.states.Object.hasOwnProprty('stop')) {
                this.code = ERROR.FLOW_STATES;
                return this.code;
            }
        }

        return SUCCESS.VALIDATED;
    }

    // *** ERROR HANDLING***
    // Create the new flow format
    createFlow() {
        // Very simple random unique ID generator
        this.formattedFlow.id = `${new Date().getTime()}`;
        this.formattedFlow.name = this.originalFlow.flow;
        this.formattedFlow.comment = this.originalFlow.comment;
        this.formattedFlow.startAt = this.originalFlow.startAt;
        this.formattedFlow.states = Object.assign({}, this.originalFlow.states);

        return { isError: false, code: this.code, item: this.formattedFlow };
    }
}

module.exports = Flow;
