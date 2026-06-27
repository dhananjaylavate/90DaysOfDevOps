FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

#Stage 2

FROM node:20 AS runner

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=builder /app .

EXPOSE 3000

CMD ["npm", "start"]