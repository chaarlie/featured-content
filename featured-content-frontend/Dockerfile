FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY tailwind.config.js  ./
COPY tsconfig.json ./

COPY ./public ./public
COPY ./src ./src

RUN npm install  
 
CMD [ "npm", "run", "start"]

 