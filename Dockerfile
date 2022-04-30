# 서버를 구동할 Node.JS 버전을 설정합니다.
ARG BASE_IMAGE=node:17-alpine3.14
FROM ${BASE_IMAGE}

LABEL maintainer="swm.elice.io"
LABEL title="Sosik-Madang"
LABEL version="1.0"

#현재 디렉토리(이미지)를 도커 볼륨에 복사합니다.
WORKDIR /app/
COPY . .

# Vue.JS를 빌드합니다
# Vue 빌드 시에 필요한 API_HOST 주소입니다.
ENV VUE_APP_API_HOST=https://sosick.shop/api
WORKDIR /app/frontend
RUN npm install --force -g yarn @vue/cli \
    && yarn install --frozen-lockfile \
    && yarn build \
    && cp -a ./dist/. /app/backend/public/

# Node.JS 관련 모듈을 설치합니다.
WORKDIR /app/backend/
RUN npm install

# 서버를 노출시킬 포트를 결정합니다.
ENV PORT=3000
EXPOSE ${PORT}/tcp

#도커 컨테이너 정지 정책을 설정합니다.
STOPSIGNAL SIGTERM

# Node.JS 서버를 시작합니다
CMD [ "node", "app.js" ]