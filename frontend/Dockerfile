FROM node:18.20.6-alpine
WORKDIR /app

RUN addgroup -g 1001 nodegroup && \
    adduser -S -G nodegroup -u 1001 nodeuser

COPY . ./

RUN npm install && npm run build && \
    chown -R nodeuser:nodegroup /app

USER nodeuser

EXPOSE 3000
CMD ["npm", "start"]