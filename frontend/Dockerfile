FROM node:22.13.1-alpine AS base
WORKDIR /app
COPY package*.json .
RUN  npm install

FROM base AS development
COPY . .
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
EXPOSE 3000
CMD [ "npm", "run", "dev" ]

FROM base AS build
COPY . .
RUN npm run build

FROM node:22.13.1-alpine AS production
WORKDIR /app 
COPY --from=build /app/.next ./.next
COPY --from=build /app/package*.json ./
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
EXPOSE 3000
CMD [ "npm", "start" ]