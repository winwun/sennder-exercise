FROM node:18-alpine
WORKDIR /workdir
COPY package.json yarn.lock ./
RUN \
    --mount=type=secret,id=npm,dst=/workdir/.npmrc \
    yarn install --frozen-lockfile --ignore-optional --non-interactive && \
    yarn cache clean
