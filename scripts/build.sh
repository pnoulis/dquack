#!/bin/bash

OPERATION=$1
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

cd "$SOURCE_DIR"

case $OPERATION in
serve)
  echo serve
  node ./build/main.bundle.cjs
  ;;
client)
  echo client
  ./tests/routes.sh
  ;;
build)
  echo build
  webpack
  ;;
watch)
  echo watch
  kill $(pgrep -f main.bundle.cjs)
  kill $(pgrep webpack)
  {
    webpack --watch </dev/null &
    sleep 3
    npx nodemon ./build/main.bundle.cjs
  } &>var/out.log &
  tail -f var/out.log
  ;;
run)
  echo run
  kill $(pgrep -f main.bundle.cjs)
  kill $(pgrep webpack)
  {
    webpack
    node ./build/main.bundle.cjs </dev/null &
    sleep 2
    ./tests/routes.sh
  } &>var/out.log &
  tail -f var/out.log
  ;;
*)
  echo "usage"
  ;;
esac
