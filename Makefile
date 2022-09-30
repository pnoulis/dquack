# Build dquack
#
# The primary targets in this file are:
#
# build
# run
# dev
# release
# clean
# stats
#

.DEFAULT_GOAL: stats
.PHONY: build run dev release clean stats test

SHELL = /bin/bash
NODE_ENV ?= dev
PREFIX := dist
SOURCE_DIR := $(realpath .)
BUILD_DIR := ${PREFIX}
SCRIPT_DIR := ${SOURCE_DIR}/scripts
CLIENT ?= ${SCRIPT_DIR}/client/dquack.sh
VAR_DIR := ${BUILD_DIR}/var
PUBLIC_DIR := ${BUILD_DIR}/public
ASSETS := ${PUBLIC_DIR}/services/*.Dockerfile
TEMPLATES := ${PUBLIC_DIR}/templates/*.Dockerfile
mkdir := mkdir -p

stats:
	@echo \
	SOURCE_DIR ${SOURCE_DIR} \
	PREFIX ${PREFIX} \
	BUILD_DIR ${BUILD_DIR} \
	SCRIPT_DIR ${SCRIPT_DIR} \
	CLIENT ${CLIENT}

# TEST
test:
	@echo "${BUILD_DIR}"

# BUILD
build: ${ASSETS} ${TEMPLATES} node_modules
	@echo building...

# assets
${ASSETS}: ${SOURCE_DIR}/assets/services/*.Dockerfile | ${BUILD_DIR}
	@echo transfering assets
	@for dockerfile in $?; \
	do \
	cat $$dockerfile > ${PUBLIC_DIR}/services/$$(basename $$dockerfile); \
	done

# templates
${TEMPLATES}: ${SOURCE_DIR}/assets/templates/*.Dockerfile | ${BUILD_DIR}
	@echo transfering templates
	@for dockerfile in $?; \
	do \
	cat $$dockerfile > ${PUBLIC_DIR}/templates/$$(basename $$dockerfile); \
	done

# make build tree
${BUILD_DIR}:
	@echo make dist tree
	${mkdir} ${BUILD_DIR}/{public,var}
	${mkdir} ${BUILD_DIR}/public/{services,templates}
	${mkdir} ${BUILD_DIR}/var/{spool,log}


node_modules: package.json
	npm install

clean:
	rm -drf ${BUILD_DIR}
# dev: build run

# .PHONY: run
# run: build

# .PHONY: build
# build: node_modules assets infrustructure

# .PHONY: env

