FROM node:latest

RUN mkdir /app
WORKDIR /app
ADD . /app

COPY start.sh /usr/bin/
RUN chmod +x /usr/bin/start.sh

EXPOSE 5000

ENTRYPOINT ["start.sh"]