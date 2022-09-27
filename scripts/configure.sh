#!/bin/bash

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
CLIENT=${SCRIPT_DIR}/client/dquack.sh

alias dquack=$CLIENT

# Ensure sponge installed
which sponge &> /dev/null
[[ $? -gt 0 ]] && cat <<EOF
Missing dependency: sponge
Install from *moreutils*
EOF


