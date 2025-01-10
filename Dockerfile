FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production
RUN npm install -g concurrently
COPY . .
RUN npm run build
