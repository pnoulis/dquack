#!/bin/bash

# Utils
SCRIPT=$(basename ${BASH_SOURCE[0]})
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
CACHE_DIR=$SCRIPT_DIR/var/cache
BUFFER=$CACHE_DIR/$USER

# Options
TEST=
VERBOSE=

# Subcommand
SUBCOMMAND=

## ---------------------------------------------------------
## ---------------------------------------------------------

# configure cache dir
[[ ! -d $CACHE_DIR ]] mkdir -p ${SCRIPT_DIR}/var/cache
# truncate previous buffer
[[ -e $BUFFER ]] && cat /dev/null > $BUFFER

# redirection or pipe
[[ -p /dev/stdin || ! -t 0 ]] && sponge $BUFFER

while getopts 'tv' option; do
    case $option in
        t)
            TEST=0
            ;;
        v)
            VERBOSE='--verbose'
            ;;
        *)
            echo "usage"
            ;;
    esac
done
shift $(($OPTIND - 1))

[[ ${@: -1} == '-' ]] && {
    sponge $BUFFER < /dev/tty
    set -- ${@: 1: $# - 1}
}

SUBCOMMAND=${1}
shift
[[ -z $SUBCOMMAND ]] && {
    echo "usage"
    exit 1
}
[[ ! -e ${SCRIPT_DIR}/dquack_${SUBCOMMAND}.sh ]] && {
    echo "$SCRIPT: Unrecognized subcommand: '${SUBCOMMAND}'"
    exit 1
}
SUBCOMMAND=${SCRIPT_DIR}/dquack_${SUBCOMMAND}.sh
. $SUBCOMMAND -b $BUFFER "$@"
