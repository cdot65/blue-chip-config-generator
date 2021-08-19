SHELL := /usr/bin/env bash
.DEFAULT_GOAL := help
.PHONY: help build run shell stop

DOCKER_IMG_BLUECHIP = bluechip
DOCKER_TAG_BLUECHIP = 0.0.1

DOCKER_IMG_BLUECHIP_API = bluechip-api
DOCKER_TAG_BLUECHIP_API = 0.0.1

DOCKER_IMG_BLUECHIP_DB = bluechip-db
DOCKER_TAG_BLUECHIP_DB = 0.0.1

CONTAINER_NAME = slack_netbox

help:
	@echo ''
	@echo 'Makefile will help us build with the following commands'
	@echo '		make build				builds the docker container'
	@echo '		make rebuild				rebuilds the application'
	@echo '		make remove				destroy the application'
	@echo '		make run				run the application'
	@echo '		make stop				stops the containers'

build:
	docker-compose build

run:
	docker-compose up -d

rebuild: stop remove build run

remove:
	docker-compose rm -f

stop:
	docker-compose stop
