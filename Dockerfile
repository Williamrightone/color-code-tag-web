FROM node:16.13.0-alpine as builder
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build --production

FROM nginxinc/nginx-unprivileged
EXPOSE 8080
COPY --from=builder /app/dist/color-code-tag /usr/share/nginx/html

