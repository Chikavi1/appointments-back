FROM node:18

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install
EXPOSE 3000
EXPOSE 80

CMD ["node", "app.js", "--host", "0.0.0.0"]
