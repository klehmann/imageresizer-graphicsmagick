FROM mindoo/node-graphicsmagick-alpine:13-1.3.30-3.10

COPY app /app
WORKDIR /app
RUN rm -rf /app/node_modules && npm install
EXPOSE 4000

# CMD [ "bash" ]
CMD [ "npm", "start" ]


