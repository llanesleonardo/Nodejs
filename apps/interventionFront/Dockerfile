FROM node:alpine

WORKDIR /interventionFront

COPY . .

RUN npm ci production

RUN npm i -g serve

RUN npm run build

EXPOSE 3005

CMD ["serve","-p","3005","-s","dist"]
