FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
RUN npm install -g concurrently
COPY . .
RUN npm run build

# Optionally remove dev dependencies after build to reduce image size
RUN npm prune --production
