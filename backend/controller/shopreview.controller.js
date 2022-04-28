const db = require('../db');

db.query('CREATE TABLE IF NOT EXISTS shop_reviews(id INT PRIMARY KEY AUTO_INCREMENT, shop_id INT, writer VARCHAR(36), rating DOUBLE, upload_time DATETIME, content TEXT, FOREIGN KEY(shop_id) REFERENCES shop_info(id) ON DELETE CASCADE ON UPDATE CASCADE)');

//TODO: Preconditions 추가. 필요없는 필드가 있다던지, 길이넘는 필드가 있다던지..etc

exports.create = (shopinfo)=>{
    return db.query('INSERT INTO shop_reviews SET ?', [shopinfo]);
}

exports.getById = (id) => {
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