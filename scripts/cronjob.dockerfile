FROM node:lts-alpine

COPY package.json .

RUN yarn install

COPY . .

CMD ["node", "scripts/download-intraday.js"]