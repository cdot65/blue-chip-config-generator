SHELL := /usr/bin/env bash
.DEFAULT_GOAL := help
.PHONY: help build run shell stop

DOCKER_IMG = slack_netbox
DOCKER_TAG = 0.0.5
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
