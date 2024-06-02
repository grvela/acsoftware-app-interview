FROM node:alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install

RUN npm run build

EXPOSE 4200

CMD ["npm", "run", "start"]