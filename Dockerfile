FROM node:8.12

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8081

CMD ["npm", "run", "start:prod"]