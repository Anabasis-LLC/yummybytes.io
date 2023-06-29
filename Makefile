DEPLOY_SHA := $(shell git rev-parse --short HEAD)
WEB_TAG := web-${DEPLOY_SHA}

web: build-web

build-web:
	@docker build \
		-t ${WEB_TAG} \
		-f ./apps/web/Dockerfile \
		--build-arg DATABASE_URL=${DATABASE_URL} \
		.

# To debug, run with `--detach ${WEB_TAG} sleep infinity` and then
# open a shell with: `docker exec -it <id> /bin/bash`
run-web: build-web
	@docker run \
		--env DATABASE_URL=${PRODUCTION_DATABASE_URL} \
		--publish 3000:3000 \
		${WEB_TAG}
