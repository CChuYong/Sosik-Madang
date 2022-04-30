const express = require('express');
const router = express.Router();
const controller = require('../../../controller/shopreview.controller');
const PipelineError = require("../../../util/PipelineError");

router.put('/', async (req, res, next) => {
    try{
        const result = await controller.create(req.body);
        console.log(result);
        res.status(200).send({
            "success": "ok",
        });
    }catch(err){
        console.log(err);
        res.status(500).send({
            "success": "failed",
            message: err instanceof PipelineError ? err.message : "unknown"
        })
    }
})

router.get('/', async (req, res, next) => {
    try{
        const [rows] = await controller.getAll();
        res.status(200).send(rows);
    }catch(err){
        res.status(500).send({
            message: err instanceof PipelineError ? err.message : "unknown"
        })
    }
})

router.get('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    try{
        const [rows] = await controller.getById(id);
        res.status(200).send(rows);
    }catch(err){
        res.status(500).send({
            message: err instanceof PipelineError ? err.message : "unknown"
        })
    }
})

module.exports = router;