cp ".env.example" ".env"

mysql -u root -e "CREATE DATABASE homestead" 

cmd /c npm update

cmd /c composer update

php artisan key:generate

php artisan migrate

php artisan db:seed

php artisan storage:link

php artisan vendor:publish


mkdir public/uploads
