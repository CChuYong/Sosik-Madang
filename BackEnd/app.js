const express = require('express');
const app = express();

//.env파일을 환경변수로 불러오기 위한 구문
require('dotenv').config();

//API 라우팅을 위한 부분
const shops = require('./routes/api/shops');
app.use('/api/shops', shops);

//FrontEnd 렌더링을 위한 부분
const index = require('./routes/index');
app.use('/', index);
app.use(require('connect-history-api-fallback')())


//서버를 호스트하는 구문
const port = process.env.PORT || 3000
app.listen(port, ()=>{
   console.log("SoSick-Madang 서버가 실행되었습니다. 포트 : " + port)
});