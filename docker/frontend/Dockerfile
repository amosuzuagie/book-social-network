FROM node:20 AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:prod || { echo 'Angular build failed'; exit 1; }

# DEBUG — print the output path contents
RUN ls -la /app/dist/book-network-client

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

#COPY --from=build-stage /app/dist/book-network-client /usr/share/nginx/html
COPY --from=build-stage /app/dist/book-network-client/browser /usr/share/nginx/html
EXPOSE 80

#FROM node:20 AS build-stage
#
#WORKDIR /app
#COPY package*.json ./
#RUN npm install
#
#COPY . .
#RUN npm run build --prod
#
#RUN ls -la /app/dist  # Debug line
#
#FROM nginx:alpine
#
#COPY nginx.conf /etc/nginx/nginx.conf
#COPY --from=build-stage /app/dist/book-app /usr/share/nginx/html
#
#EXPOSE 80
