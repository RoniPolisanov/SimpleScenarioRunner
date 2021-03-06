
const STOP = 'stop';

class ExceptionFlow{
    constructor(){
        this.exceptionFlow = {};
        this.prev = '';
        this.createFlow();
    }

    createFlow(){
        this.exceptionFlow.comment = 'The Exception POC flow';
        this.exceptionFlow.startAt = '';
        this.exceptionFlow.states = {};
        this.exceptionFlow.flowId = `${new Date().getTime()}`;
        this.exceptionFlow.flowName = 'Exception-flow';
        this.exceptionFlow.flowStartTime = new Date().getTime();
        this.exceptionFlow.flowExecutionTime = '';

    }

    addTask(task){
        let taskName = task.item.name;

        this.exceptionFlow.states[`${taskName}`] = task.item;
        
        // Initialize exception flow 'startAt' first task
        if(!this.exceptionFlow.startAt){
            this.exceptionFlow.states[STOP] = {"end": true};
            this.exceptionFlow.startAt = task.item.name;

            this.exceptionFlow.states[`${taskName}`].next = STOP;

            this.prev = taskName;
        }
        
        if(this.exceptionFlow.startAt && this.prev){
            this.exceptionFlow.states[`${this.prev}`].next = taskName;
            this.exceptionFlow.states[`${taskName}`].next = STOP;
            this.prev = taskName;
        }

    }

    getFlow(){
        return this.exceptionFlow;
    }
}

module.exports = ExceptionFlow;
