const express = require('express');
const router = express.Router();
const controller = require('../../../controller/shopreview.controller');

router.put('/', async (req, res, next) => {
    try{
        const result = await controller.create(req.query);
        console.log(result);
        res.status(200).send({
            "success": "ok",
        });
    }catch(err){
        console.log(err);
        res.status(500).send({
            "success": "failed"
        })
    }
})

router.get('/', async (req, res, next) => {
    try{
        const [rows] = await controller.getAll();
        res.status(200).send(rows);
    }catch(err){
        res.status(500).send({
            message: "unexpected error has occured"
        })
    }
})

router.get('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    try{
        const [rows] = await controller.getById(id);
        res.status(200).send(rows[0]);
    }catch(err){
        res.status(500).send({
            message: "unexpected error has occured"
        })
    }
})

module.exports = router;