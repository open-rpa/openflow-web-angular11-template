FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY dist/openflow-web-angular11-template .
# copy nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443
CMD [ "nginx", "-g", "daemon off;" ]

