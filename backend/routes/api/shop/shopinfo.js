const express = require('express');
const router = express.Router();
const controller = require('../../../controller/shopinfo.controller');
const review_controller = require('../../../controller/shopreview.controller');
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
        // const result = [];
        // for(let index = 0; index < rows.length; index++){
        //     const elem = rows[index];
        //     const reviewCnt = await review_controller.getReviewCountById(elem.id) || 0;
        //     const reviewAvg = reviewCnt > 0 ? await review_controller.getRatingById(elem.id) : 0;
        //     const tempData = {
        //         "reviewCount": reviewCnt,
        //         "rating": reviewAvg
        //     }
        //     result.push(Object.assign(tempData, elem));
        // }
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
        // const reviewCnt = await review_controller.getReviewCountById(id) || 0;
        // const reviewAvg = reviewCnt > 0 ? await review_controller.getRatingById(id) : 0;
        // const data = await rows[0];
        // Object.assign(data, {
        //     reviewCount: reviewCnt,
        //     rating: reviewAvg
        // });
        res.status(200).send(rows);
    }catch(err){
        res.status(500).send({
            message: err instanceof PipelineError ? err.message : "unknown"
        })
    }
})

module.exports = router;