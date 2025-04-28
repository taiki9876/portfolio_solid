FROM php:8.2-apache-bullseye AS base

# apt
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
    libzip-dev \
    libprotobuf-dev \
    protobuf-compiler \
    zlib1g-dev \
    libjpeg-dev \
    libpng-dev \
    libfreetype6-dev \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# gRPC
RUN pecl install grpc && \
    docker-php-ext-enable grpc && \
    rm -rf /tmp/pear

# PHP拡張
RUN pecl install redis && \
    docker-php-ext-enable redis && \
    docker-php-ext-configure gd --with-jpeg --with-freetype  && \
    docker-php-ext-install zip pdo_mysql gd


ENV NODE_VERSION 18.19.0
# install nodejs
RUN curl --compressed "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" > /tmp/node.tar.xz && \
  tar -xJf /tmp/node.tar.xz -C /usr/local --strip-components=1 && \
  ln -s /usr/local/bin/node /usr/local/bin/nodejs && \
  rm /tmp/node.tar.xz

# php settings
COPY ./docker/php/conf/php.ini /usr/local/etc/php/php.ini
COPY ./docker/php/conf/apache2.conf /etc/apache2/

COPY ./docker/php/conf/000-default.conf /etc/apache2/sites-enabled/

# composer
COPY --from=composer:lts /usr/bin/composer /usr/bin/composer

# apacheのrewriteモジュールを有効にする
RUN mv /etc/apache2/mods-available/rewrite.load /etc/apache2/mods-enabled
RUN /bin/sh -c a2enmod rewrite

RUN mv /etc/apache2/mods-available/headers.load /etc/apache2/mods-enabled
RUN /bin/sh -c a2enmod headers


# Production デプロイ時はこちらをターゲットにする
FROM base AS production

WORKDIR /var/www/html
RUN cp /usr/local/etc/php/php.ini-production /usr/local/etc/php/php.ini

COPY . /var/www/html
RUN cp .env.production .env
RUN chmod -R 777 storage/ bootstrap/cache

COPY --from=composer:lts /usr/bin/composer /usr/bin/composer
RUN COMPOSER_ALLOW_SUPERUSER=1 /usr/bin/composer install --no-scripts --no-dev --no-autoloader

RUN npm ci

## フロント用アプリケーションをビルド
RUN npm run build

#vendorなどがインストールされているか確認する
RUN ls .
RUN ls ./vendor

# apacheのaccess_logが標準出力に出ないようにする
RUN unlink /var/log/apache2/access.log
RUN unlink /var/log/apache2/error.log
RUN unlink /var/log/apache2/other_vhosts_access.log

RUN COMPOSER_ALLOW_SUPERUSER=1 composer dump-autoload -o && \
    php artisan view:cache


