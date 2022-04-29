class PipelineError extends Error{
    constructor(message){
        super(message);
        this.name = "PipelineError";
    }
}
module.exports = PipelineError;