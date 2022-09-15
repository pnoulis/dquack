#!/bin/bash

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
SOURCE_DIR=$(realpath ${SCRIPT_DIR}/..)

cd "$SOURCE_DIR"
mkdir -p var 2>/dev/null

while read -r input; do
  echo "$input" >var/out.log
done
exit 0
