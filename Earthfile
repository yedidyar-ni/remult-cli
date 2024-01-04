VERSION 0.7
FROM earthly/dind:alpine-3.18
WORKDIR remult-cli
RUN apk add nodejs npm

deps:
    COPY package.json pnpm-lock.yaml ./
    RUN npm install -g pnpm
    RUN pnpm install
    COPY tsconfig.json ./
    COPY src src

build:
    FROM +deps
    RUN pnpm build
    SAVE ARTIFACT dist /dist AS LOCAL dist

test-setup:
    FROM +deps
    COPY integration integration


integration-test:
    FROM +test-setup
    COPY docker-compose.yml ./ 
    COPY +build/dist ./dist
    WITH DOCKER --compose docker-compose.yml
        RUN sleep 6 && pnpm test:ci
    END


all:
    BUILD +build
    BUILD +integration-test