# Frontend Dockerfile
# ./frontend/Dockerfile
FROM node:18-alpine

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

# Build for production
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]