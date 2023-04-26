FROM node

WORKDIR /app

RUN npm install -g sequelize-cli

COPY package.json ./

RUN npm install

COPY ./config ./config

COPY . . 

CMD ["npm", "run", "docker:run"]