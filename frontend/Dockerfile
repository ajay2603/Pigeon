FROM node:lts-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV VITE_API_ROUTE=/backend-api
RUN npm run build


FROM ajay2603/pigeon-f-deployment:1.0.0

COPY --from=build /app/dist /app/public/

ENV PORT=3000
EXPOSE 3000



