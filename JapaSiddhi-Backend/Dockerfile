FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

ENV NODE_ENV=production
ENV DB_ENGINE=sqlite
ENV SQLITE_PATH=/var/data/japa_siddhi.sqlite

EXPOSE 5000

CMD ["npm", "start"]
