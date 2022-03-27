FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g mocha mocha-jenkins-reporter
RUN npm --allow-root install
COPY . .
EXPOSE 3000
CMD ["node","server.js"]
