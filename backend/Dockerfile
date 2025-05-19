

# Build Stage
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY . .

# Final Stage
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 5000
CMD ["npm", "run", "start:dev"]
