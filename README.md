소食마당 - SOsik MAdang
======================
 **소**食**마**당 \[**SO**sik **MA**dang\]은 [소마센터](https://goo.gl/maps/y3m9KtLV7YRQQMYw5) 근처의 맛집들의 정보를 보여주고, 리뷰와 별점을 남기고 공유할 수 있는 공간입니다🍖  
 > 영어 명칭은 어떠한 사유로 인해 `SO"sik" MAdang`과 `SO"sick" MAdang`이 병행 사용됩니다.

혹시 본인의 환경에서 이 서버를 직접 돌려보고싶으시면 아래 설치하기 메뉴얼을 참고해주세요!

# 체험하기
호스팅되어있는 라이브 소식-마당을 체험해보고 싶으시다면, [소식마당](https://sosick.shop/) 를 통해서 참여하실 수 있습니다!  
체험 후 [엘리스 프로젝트 페이지](https://project.sosick.shop/) 을 통해 좋아요 눌러주시면 큰 힘이 됩니다..!
 # 설치하기 (Standalone)
 아래 항목은 소식-마당 서버를 설치하고 배포하는 두가지 방법을 소개합니다.
 ## Docker을 통한 설치

 ### 실행
본 프로젝트는 도커를 통해서 프론트/백엔드 빌드 및 실행을 한번에 할 수 있게끔 설계되어있습니다.  
다음은 실행을 위해 필요한 준비물입니다
* MySQL/MariaDB 서버
* Docker이 설치된 환경
* 카카오맵 API 토큰
* CORS와 충돌하지 않는 API 주소

위를 만족하셨다면 다음을 통해 소식마당을 실행하실 수 있습니다.  
위에 관한 정보는 아래 환경변수 탭을 참고하여 적용해주세요. 위 조건이 충족되지 않을 경우 서버가 정상적으로 작동하지 않습니다.
```
sudo docker run -it -p80:3030 sosickmadang
```
### 환경변수
-e \<NAME> = \<VALUE> 형식으로 작성하여 환경 변수를 입력하거나, --env-file \<FILENAME> 형식으로 환경변수 파일을 만들어서 도커 컨테이너에 제공할 수 있습니다.
MYSQL 정보가 정확하지 않거나 제공되지 않을 경우 백엔드 서버가 정상적으로 시작되지 않습니다.

* PORT
    * 백엔드 웹서버가 실행될 포트 번호입니다.
    * 도커 실행시 3030에 위치하는 포트와 같아야 컨테이너 밖에서 접속할 수 있습니다.
* MYSQL_ADDRESS
    * MYSQL 주소 입니다.
* MYSQL_DATABASE
    * MYSQL 데이터베이스 입니다.
    * 데이터가 한글로 처리되는 이유로, utf8에 문자열셋으로 설정되어있어야 합니다.
* MYSQL_USERNAME
    * MYSQL 아이디 입니다.
* MYSQL_PASSWORD
    * MYSQL 비밀번호 입니다.
* VUE_APP_KAKAOMAP_TOKEN
    * KAKAOMAP API 토큰입니다.
* VUE_APP_API_HOST
    * 서버가 Deploy되는 호스트 이름입니다.


## NPM을 통한 설치
### 설치
다음 명령어로 소식마당 서버를 설치하고 빌드할 수 있습니다.  

```
git clone [여기에 git 주소 입력]
cd sosick-madang/frontend
npm install -g yarn @vue/cli 
yarn install --frozen-lockfile 
yarn build
cp ./dist/* ../backend/public
cd ../backend
npm install
```
### 실행
```
cd sosick-madang/backend
npm start
```
이 과정 역시 Docker 설치 방법과 마찬가지로 MySQL 설정이 필요합니다. 환경변수 설정을 하셔도 좋고, 혹은 .env 파일을 만들어서 backend 폴더에 넣은 후 실행시 자동으로 환경변수로 인식합니다.
