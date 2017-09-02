#!/bin/bash
sudo apt -y install software-properties-common
sudo add-apt-repository ppa:ondrej/php
sudo apt update
apt -y install nginx git php7.1 php7.1-mysql php7.1-fpm php7.1-mbstring php7.1-xml php7.1-curl mysql-server
mkdir -p /var/www/html
rm -rf /var/www/html/*
git clone https://github.com/SparkMakerspace/MakerSpaceMngSys.git /var/www/html/
mv ./linux.nginx.default.conf /etc/nginx/conf.d/default.conf
sed -i 's/localhost/nonstop3d.com/g' /etc/nginx/conf.d/default.conf
echo ‘cgi.fix_pathinfo=0’ >> /etc/php/7.1/fpm/php.ini
/etc/init.d/nginx restart
/etc/init.d/php7.1-fpm restart
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
cd /var/www/html
chown -R www-data:www-data /var/www/html
chmod -R 775 /var/www/html/storage
