#!/bin/bash
MODE="$1"
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
SOURCE_DIR=$(realpath ${SCRIPT_DIR}/..)
BUILD_DIR="${SOURCE_DIR}/build"
ENV_DIR="${SOURCE_DIR}/config"
ENVAR_RE='^\w+=\w+$'
ENV_EXAMPLE="${ENV_DIR}/env.example"
env="${ENV_DIR}/.env.dev"

set -o allexport
source "$ENV_EXAMPLE"
source "$env"

