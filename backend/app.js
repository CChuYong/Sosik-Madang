const express = require('express');
const bodyParser = require('body-parser')
const app = express();

//.env파일을 환경변수로 불러오기 위한 구문
require('dotenv').config();

//API 라우팅을 위한 부분
const shopInfo = require('./routes/api/shop/shopinfo');
const shopReview = require('./routes/api/shop/shopreview');
const shopDetail = require('./routes/api/shop/shopdetail');
app.use(bodyParser.json())
app.use('/api/shops/info', shopInfo);
app.use('/api/shops/reviews', shopReview);
app.use('/api/shops/detail', shopDetail)

//FrontEnd 렌더링을 위한 부분
const index = require('./routes/index');
app.use(express.static(__dirname + '/public'));
app.get('/', index);
app.use(require('connect-history-api-fallback')())


//서버를 호스트하는 구문
const port = process.env.PORT || 3000
app.listen(port, ()=>{
   console.log("SOsik-MAdang 서버가 실행되었습니다. 포트 : " + port)
});

//박민영 다녀감,,ㅎ