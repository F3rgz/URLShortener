FROM node:20 as base

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

FROM node:20 as builder

# Create the apps directory.
WORKDIR /app

COPY . .

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package*.json ./
COPY --from=base /app/prisma ./prisma

RUN npm run build

FROM node:20 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/tsconfig.json ./

CMD [ "npm", "run", "start:migrate:prod" ]
