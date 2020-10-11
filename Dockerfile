FROM node:alpine as REACT_BUILD
WORKDIR /app
COPY ./ ./
RUN npm cache clean --force
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY nginx/template.conf /etc/nginx/conf.d/default.conf
COPY --from=REACT_BUILD /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]