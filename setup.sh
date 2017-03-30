cp ".env.example" ".env"

mysql -u root -e "CREATE DATABASE homestead" 

npm update

composer update

php artisan key:generate

php artisan migrate

php artisan db:seed

php artisan storage:link

php artisan vendor:publish


mkdir public/uploads
