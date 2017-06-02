cp ".env.example" ".env"

mysql -u root -e "CREATE DATABASE homestead"

npm update

composer update

php artisan key:generate

php artisan migrate

php artisan db:seed

php artisan storage:link

php artisan vendor:publish

# wget https://github.com/roundcube/roundcubemail/releases/download/1.2.4/roundcubemail-1.2.4-complete.tar.gz -P public/webmail/

# tar -xvf public/webmail/roundcubemail-1.2.4-complete.tar.gz

# rm public/webmail/roundcubemail-1.2.4-complete.tar.gz

# script for roundcube installation
# https://gist.githubusercontent.com/rcubetrac/cc85589b837d58680a86e7b5cbb09a4f/raw/6a04577ae65c9a035404ea46f5861c939558c248/debian_install_mysql.sh%25E2%2580%258B

mkdir public/uploads
