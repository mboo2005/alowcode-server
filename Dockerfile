FROM node:20-alpine
RUN npm install pm2@latest -g

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm update
RUN npm install

COPY --chown=node:node . .

EXPOSE 8000

CMD [ "pm2-runtime", "start", "pm2.json","--env","production"]