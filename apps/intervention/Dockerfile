# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /intervention
COPY ["package.json","package-lock.json*","./"]
RUN npm ci production
COPY . .
CMD ["node", "src/index.js"]
EXPOSE 3000