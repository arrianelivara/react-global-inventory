FROM node:lts-alpine

ARG API_URL
ARG COGNITO_REGION
ARG COGNITO_USER_POOL_ID
ARG COGNITO_WEB_CLIENT_ID

ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .

FROM nginx:alpine

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

COPY --from=builder /app/dist .

COPY .nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
EXPOSE 8000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
