PREFIX := "build"
BUILD_DIR := ${PREFIX}

.DEFAULT_GOAL: configure

.PHONY: configure
configure:
	@echo ${BUILD_DIR}
	mkdir -p ${BUILD_DIR}/
