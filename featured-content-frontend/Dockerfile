FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY postcss.config.js  ./
COPY next.config.js  ./
COPY tailwind.config.js  ./
COPY tsconfig.json ./

COPY ./public ./public
COPY ./src ./src

RUN npm install --only=development
 
CMD [ "npm", "run", "start"]

 