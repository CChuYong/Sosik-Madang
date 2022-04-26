const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
   res.status(200).json({
       message: "Success"
   }) ;
});

router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id, 10);
     res.status(200).json({
        "id": id,
        message: 'API Test'
     });
})

module.exports = router;