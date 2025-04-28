APP_ENV_PATH := ./backend/.env

#Backend ----------------------------------------------------------------------
.PHONY: build
build:
	@docker compose --env-file $(APP_ENV_PATH) build

.PHONY: up
up: build
	@docker compose --env-file $(APP_ENV_PATH) up

.PHONY: upd
upd: build
	@docker compose --env-file $(APP_ENV_PATH) up -d

.PHONY: down
down:
	@docker compose --env-file $(APP_ENV_PATH) down

.PHONY: bash
bash:
	@docker compose --env-file $(APP_ENV_PATH) exec app bash

.PHONY: composer
composer:
	@docker compose --env-file $(APP_ENV_PATH) exec app sh -c "composer install"

.PHONY: migrate
migrate:
	@docker compose --env-file $(APP_ENV_PATH) exec app sh -c "php artisan migrate"

.PHONY: migrate-refresh
migrate-refresh:
	@docker compose --env-file $(APP_ENV_PATH) exec app sh -c "php artisan migrate:fresh --seed"


.PHONY: lint-b
lint-b:
	@docker compose --env-file $(APP_ENV_PATH) exec app sh -c "vendor/bin/php-cs-fixer fix --diff && vendor/bin/phpstan analyse --verbose --no-progress --no-interaction --memory-limit=4G"

.PHONY: test-b
test-b:
	@docker compose --env-file $(APP_ENV_PATH) exec app sh -c "vendor/bin/phpunit -d memory_limit=-1 --stop-on-failure"

.PHONY: pr-b
pr-b: lint-b test-b
#--------------------------------------------------------------------------------

#Frontend ----------------------------------------------------------------------
.PHONY: npm
npm:
	@cd frontend && npm install

.PHONY: watch
watch:
	@cd frontend && npm run dev:watch

.PHONY: watch-c
watch-c:
	@cd frontend && npm run dev:watch:client

.PHONY: prod
prod:
	@cd frontend && npm run build

.PHONY: story
story:
	@cd frontend && npm run storybook

.PHONY: lint-f
lint-f:
	@cd frontend && npm run lint && npm run type-check

.PHONY: test-f
test-f:
	@cd frontend && npm run test

.PHONY: pr-f
pr-f: lint-f test-f

#--------------------------------------------------------------------------------

#All --------------------------------------------------------------------------
# プッシュする前に実行を推奨
.PHONY: pr
pr: pr-b pr-f