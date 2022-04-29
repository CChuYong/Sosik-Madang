const path = require('path');

function Index(req, res, next){
    res.sendFile(path.join(__dirname, '../public/index.html'));
}

module.exports = Index