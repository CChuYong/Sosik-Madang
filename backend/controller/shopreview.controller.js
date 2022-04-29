const db = require('../db');
const moment = require('moment');
const PipelineError = require("../util/PipelineError");

db.query('CREATE TABLE IF NOT EXISTS shop_reviews(id INT PRIMARY KEY AUTO_INCREMENT, shop_id INT, writer VARCHAR(36), rating DOUBLE, upload_time DATETIME, content TEXT, FOREIGN KEY(shop_id) REFERENCES shop_info(id) ON DELETE CASCADE ON UPDATE CASCADE)');

exports.create = (shopinfo)=>{
    if(shopinfo.content > 60000){
        throw new PipelineError("글 길이는 60000자를 초과할 수 없습니다");
    }
    if(!shopinfo.shop_id){
        throw new PipelineError("상점 아이디를 입력해야 합니다.");
    }
    if(!shopinfo.rating){
        throw new PipelineError("평점을 입력해야 합니다.");
    }
    if(shopinfo.id || shopinfo.upload_time){
        throw new PipelineError("id/upload_time 필드는 사용할 수 없습니다.");
    }
    const mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    Object.assign(shopinfo, {
        upload_time: mysqlTimestamp
    })
    return db.query('INSERT INTO shop_reviews SET ?', [shopinfo]);
}

exports.getById = (id) => {
    if(isNaN(id)){
        throw new PipelineError("숫자만 입력할 수 있습니다.");
    }
    return db.query('SELECT * FROM shop_reviews WHERE shop_id = ?', [id]);
}

exports.getAll = () => {
    return db.query('SELECT * FROM shop_reviews');
}

exports.getRatingById = async (id) => {
    const [rows] = await db.query('SELECT AVG(rating) as rating FROM shop_reviews WHERE shop_id = ?', [id]);
    return rows[0].rating;
}

exports.getReviewCountById = async (id) => {
    const [rows] = await db.query('SELECT COUNT(rating) as rating FROM shop_reviews WHERE shop_id = ?', [id]);
    return rows[0].rating;
}