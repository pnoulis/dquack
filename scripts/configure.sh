#!/bin/bash

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
SOURCE_DIR=$(realpath $SCRIPT_DIR/..)
CLIENT=${SCRIPT_DIR}/client/dquack.sh

alias dquack=$CLIENT

# Ensure sponge is installed
which sponge &> /dev/null
[[ $? -gt 0 ]] && cat <<EOF
Missing dependency: sponge
Install from *moreutils*
EOF

# Ensure curl is installed
which curl &> /dev/null
[[ $? -gt 0 ]] && cat <<EOF
Missing dependency: curl
EOF


