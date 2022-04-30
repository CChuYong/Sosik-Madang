const express = require('express');
const router = express.Router();
const controller = require('../../../controller/shopdetail.controller');
const infoController = require('../../../controller/shopinfo.controller');
const menuController = require('../../../controller/shopmenu.controller');
const PipelineError = require("../../../util/PipelineError");

router.put('/', async (req, res, next) => {
    try{
        const result = await controller.create(req.query);
        console.log(result);
        res.status(200).send({
           "success": "ok",
            "id": result.insertId
        });
    }catch(err){
        console.log(err);
        res.status(500).send({
            "success": "no",
            "message": err instanceof PipelineError ? err.message : "unknown"
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
        const [infos] = await infoController.getById(id);
        const [menuData] = await menuController.getById(id);
        const data = infos[0]
        if(rows.length > 0){
            Object.assign(data, rows[0])
            delete data.shop_id
        }
        data.menus = menuData
        res.status(200).send(data);
    }catch(err){
        console.log(err);
        res.status(500).send({
            message: err instanceof PipelineError ? err.message : "unknown"
        })
    }
})

module.exports = router;