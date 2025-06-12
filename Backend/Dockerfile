FROM php:8.0-fpm

WORKDIR /var/www/html

COPY . .

RUN apt-get update && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd pdo pdo_mysql

RUN composer install --optimize-autoloader --no-dev

CMD ["php-fpm"]
