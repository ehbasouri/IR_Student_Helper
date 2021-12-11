
FROM node

WORKDIR /project

COPY ./package.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "start"]