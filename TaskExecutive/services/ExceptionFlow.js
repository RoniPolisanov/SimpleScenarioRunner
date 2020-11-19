
const STOP = 'stop';

class ExceptionFlow{
    constructor(){
        this.exceptionFlow = {};
        this.prev = '';
        this.createFlow();
    }

    createFlow(){
        this.exceptionFlow.id = `${new Date().getTime()}`;
        this.exceptionFlow.name = 'Exception-flow';
        this.exceptionFlow.comment = 'The Exception POC flow';
        this.exceptionFlow.startAt = '';
        this.exceptionFlow.states = {};
    }

    addTask(task){
        console.log(task)
        let taskName = this.exceptionFlow.states[`${Object.keys(task)[0]}`];
        console.log(Object.keys(task))

        this.exceptionFlow.states[`${taskName}`] = task;
        
        // Initialize exception flow 'startAt' first task
        if(!this.exceptionFlow.startAt){
            this.exceptionFlow.states[STOP] = {"end": true};
            this.exceptionFlow.startAt = taskName;
            console.log(this.exceptionFlow.startAt)
            console.log(taskName)

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
