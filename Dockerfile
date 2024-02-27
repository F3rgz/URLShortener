FROM node:20 As development

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

EXPOSE 3000

FROM node:20 AS builder

# Create the apps directory.
WORKDIR /app

# Copy the package.json and prisma files over.
COPY package*.json ./
COPY prisma ./prisma/

COPY --from=development /app/node_modules ./node_modules

COPY . .

RUN npm run build

FROM node:20 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=development /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=development /app/prisma ./prisma

CMD [ "npm", "run", "start:migrate:prod" ]
