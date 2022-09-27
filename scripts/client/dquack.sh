#!/bin/bash

# Options
TEST=
VERBOSE=
SILENT=
EXISTS=

# Utils
SCRIPT=$(basename ${BASH_SOURCE[0]})
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
CACHE_DIR=$SCRIPT_DIR/var/cache
BUFFER=$CACHE_DIR/$USER
SUBCOMMAND=

## ---------------------- CLIENT SETUP ------------------ ##
## ---------------------------------------------------------
# url encoding table:
# https://www.w3schools.com/tags/ref_urlencode.ASP
#
# quick ref:
# / %2F
# - %2D
# . %2E
# : %3A
DUMMY_USER='pnoul'
DUMMY_APP='master'
SERVER_HOSTNAME='localhost:8080'
QUERY_STRING="?user=${DUMMY_USER}&app=${DUMMY_APP}"

function makeURL {
    if [ $TEST ]; then
        echo ${SERVER_HOSTNAME}/test${QUERY_STRING}
    elif [ -n "$1" ]; then
        echo ${SERVER_HOSTNAME}${1}${QUERY_STRING}
    else
        echo ''
        exit 1
    fi
    exit 0
}

## --------------------- PARSE ARGS --------------------- ##
## ------------------------------------------------------ ##
# make cache dir
[[ ! -d $CACHE_DIR ]] && mkdir -p ${SCRIPT_DIR}/var/cache
# truncate previous buffer
[[ -e $BUFFER ]] && cat /dev/null > $BUFFER
# redirection or pipe
[[ -p /dev/stdin || ! -t 0 ]] && sponge $BUFFER

while getopts 'tvse' option; do
    case $option in
        t)
            TEST=0
            ;;
        v)
            VERBOSE='--verbose'
            ;;
        s)
            SILENT=0
            ;;
        e)
            EXISTS=0
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

if [[ -e ${SCRIPT_DIR}/dquack_${SUBCOMMAND}.sh ]]; then
    SUBCOMMAND=${SCRIPT_DIR}/dquack_${SUBCOMMAND}.sh
else
    set -- $SUBCOMMAND "$@"
    SUBCOMMAND=${SCRIPT_DIR}/dquack_var.sh
fi

. $SUBCOMMAND "$@"
