const db = require('../db');
const PipelineError = require("../util/PipelineError");

db.query('CREATE TABLE IF NOT EXISTS shop_info(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(36) UNIQUE KEY, type VARCHAR(16), location_lat DOUBLE, location_lng DOUBLE)');

const types = ["한식", "중식", "일식", "서양식", "베트남식", "카페", "디저트/빵", "패스트푸드", "기타"]
exports.create = (shopinfo)=>{
    if(shopinfo.name.length > 36){
        throw new PipelineError("글 길이는 36자를 초과할 수 없습니다");
    }
    if(!types.includes(shopinfo.type)){
        throw new PipelineError("그러한 음식 종류는 사용할 수 없습니다");
    }
    if(shopinfo.id){
        throw new PipelineError("ID필드는 사용할 수 없습니다");
    }
    if(!shopinfo.location_lat || !shopinfo.location_lng){
        throw new PipelineError("좌표가 입력되지 않았습니다");
    }
    return db.query('INSERT INTO shop_info SET ?', [shopinfo]);
}

exports.getById = (id) => {
    if(isNaN(id)){
        throw new PipelineError("숫자만 입력할 수 있습니다.");
    }
    return db.query('SELECT shop_info.id, `name`, `type`, `location_lat`, `location_lng`, COUNT(shop_reviews.id) AS reviewCount, AVG(NVL(rating, 0)) AS rating FROM shop_info LEFT JOIN shop_reviews ON (shop_info.id = shop_reviews.shop_id) WHERE shop_info.id = ? GROUP BY (shop_info.id)', [id])
    //return db.query('SELECT * FROM shop_info WHERE id = ?', [id]);
}

exports.getAll = () => {
    return db.query('SELECT shop_info.id, `name`, `type`, `location_lat`, `location_lng`, COUNT(shop_reviews.id) AS reviewCount, AVG(NVL(rating, 0)) AS rating FROM shop_info LEFT JOIN shop_reviews ON (shop_info.id = shop_reviews.shop_id) GROUP BY (shop_info.id)');
    //return db.query('SELECT * FROM shop_info');
}