# 서버를 구동할 Node.JS 버전을 설정합니다.
ARG BASE_IMAGE=18-alpine3.14
FROM ${BASE_IMAGE}

LABEL maintainer="swm.elice.io"

# Vue.JS를 빌드합니다
WORKDIR /frontend
RUN npm install -g yarn @vue/cli \
    yarn install --frozen-lockfile \
    yarn build
COPY dist ../

# Node.JS 관련 모듈을 설치합니다.
WORKDIR /backend
RUN npm install

# 서버를 노출시킬 포트를 결정합니다.
ENV PORT=3000
EXPOSE ${PORT}

# Node.JS 서버를 시작합니다
ENTRYPOINT [ "npm start" ]
