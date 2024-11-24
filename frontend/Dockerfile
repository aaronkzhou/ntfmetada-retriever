# Frontend Dockerfile
# ./frontend/Dockerfile

FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "dev", "--", "--port", "3000", "--host"]