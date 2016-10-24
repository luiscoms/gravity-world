FROM node:6.9.1

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
ENV HOME /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

ENV PATH $PATH:/usr/src/app/node_modules/.bin/

EXPOSE 7777

CMD [ "npm", "start" ]
