const db = require('../db');

db.query('CREATE TABLE IF NOT EXISTS shop_info(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(36) UNIQUE KEY, type VARCHAR(16), location_lat DOUBLE, location_lng DOUBLE)');

//TODO: Preconditions 추가. 필요없는 필드가 있다던지, 길이넘는 필드가 있다던지..etc
exports.create = (shopinfo)=>{
    return db.query('INSERT INTO shop_info SET ?', [shopinfo]);
}

exports.getById = (id) => {
    return db.query('SELECT * FROM shop_info WHERE id = ?', [id]);
}

exports.getAll = () => {
    return db.query('SELECT * FROM shop_info');
}