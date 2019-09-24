FROM nginx
RUN mkdir /usr/share/nginx/dist
RUN rm -rf /etc/nginx/nginx.conf
COPY ./dist /usr/share/nginx/dist
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./startup.sh /opt/startup.sh
RUN chmod +x /opt/startup.sh
EXPOSE 9010
ENV CONFIG_ADMIN_API="localhost:8080"
CMD /opt/startup.sh ${CONFIG_ADMIN_API}
# CMD sed -i 's/CONFIG_ADMIN_API/${CONFIG_ADMIN_API}/' /etc/nginx/nginx.conf && nginx -g 'daemon off;'