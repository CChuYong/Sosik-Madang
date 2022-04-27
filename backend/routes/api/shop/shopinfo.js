const express = require('express');
const router = express.Router();
const controller = require('../../../controller/shopinfo.controller');
const review_controller = require('../../../controller/shopreview.controller');

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
            "success": "no"
        })
    }
})

router.get('/', async (req, res, next) => {
    try{
        //TODO: DB를 엄청 갉아먹는 구문임. 아에 전체 리스트는 캐시해두거나, DB쿼리를 조인해서 쓰거나..
        const [rows] = await controller.getAll();
        const result = [];
        for(let index = 0; index < rows.length; index++){
            const elem = rows[index];
            const reviewCnt = await review_controller.getReviewCountById(elem.id) || 0;
            const reviewAvg = reviewCnt > 0 ? await review_controller.getRatingById(elem.id) : 0;
            const tempData = {
                "reviewCount": reviewCnt,
                "rating": reviewAvg
            }
            result.push(Object.assign(tempData, elem));
        }
        res.status(200).send(result);
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
        const reviewCnt = await review_controller.getReviewCountById(id) || 0;
        const reviewAvg = reviewCnt > 0 ? await review_controller.getRatingById(id) : 0;
        const data = await rows[0];
        Object.assign(data, {
            reviewCount: reviewCnt,
            rating: reviewAvg
        });
        res.status(200).send(data);
    }catch(err){
        res.status(500).send({
            message: "unexpected error has occured"
        })
    }
})

module.exports = router;