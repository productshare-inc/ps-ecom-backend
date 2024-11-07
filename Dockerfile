FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production
RUN npm install -g concurrently
COPY . .
RUN npm run build
CMD ["sh", "-c", "npm run migration:run && npm run populate && npm run start"]