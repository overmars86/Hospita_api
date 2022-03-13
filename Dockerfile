FROM node:9-slim
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD ["npm","server.js"]
EXPOSE 3000
