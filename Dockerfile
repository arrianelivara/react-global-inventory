FROM node:lts-alpine

# Add a work directory
WORKDIR /app

COPY package.json .

RUN npm install

COPY . /app/

RUN npm run build

FROM react-global-inventory:804f9cebfdc5

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

COPY --from=builder /app/dist .

COPY .nginx/nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
