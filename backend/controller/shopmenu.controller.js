const db = require('../db');
const PipelineError = require("../util/PipelineError");

db.query('CREATE TABLE IF NOT EXISTS shop_menus(shop_id INT, menu_name VARCHAR(128), menu_price VARCHAR(36), FOREIGN KEY(shop_id) REFERENCES shop_info(id) ON DELETE CASCADE ON UPDATE CASCADE)');

exports.create = (shopinfo)=>{
    if(!shopinfo.shop_id){
        throw new PipelineError("상점 ID가 입력되지 않았습니다");
    }
    return db.query('INSERT INTO shop_menus SET ?', [shopinfo]);
}

exports.getById = (id) => {
    if(isNaN(id)){
        throw new PipelineError("숫자만 입력할 수 있습니다.");
    }
    return db.query('SELECT menu_name, menu_price FROM shop_menus WHERE shop_id = ?', [id]);
}

exports.getAll = () => {
    return db.query('SELECT * FROM shop_menus');
}