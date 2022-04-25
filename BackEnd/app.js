const express = require('express');
const app = express();

//.env파일을 환경변수로 불러오기 위한 구문
require('dotenv').config();


app.get('/', (req, res)=>{
    res.send('Welcome to SoSick-Madang~!')
});

//서버를 호스트하는 구문
const port = process.env.PORT || 3000
app.listen(port, ()=>{
   console.log("SoSick-Madang 서버가 실행되었습니다. 포트 : " + port)
});