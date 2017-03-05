#! /bin/bash

composer install

cp ".env.example" ".env"

mysql -u root -e "CREATE DATABASE homestead" 

npm install

composer update

php artisan key:generate

php artisan migrate

php artisan db:seed

php artisan storage:link
