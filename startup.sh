#/bin/bash
echo "启动中，api路径：$@"
sed -i "s/CONFIG_ADMIN_API/$@/" /etc/nginx/nginx.conf
nginx -g "daemon off;"