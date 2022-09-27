#!/bin/bash

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
CACHE_DIR=$SCRIPT_DIR/var/cache
BUFFER=$CACHE_DIR/$USER

# Options
VERBOSE=
TEST=
SUBCOMMAND=$SCRIPT_DIR/'dquack_'

[[ -p /dev/stdin || ! -t 0 ]] && sponge $BUFFER

while getopts 'tv' option; do
    case $option in
        v)
            VERBOSE='--verbose'
            ;;
        t)
            TEST=0
            ;;
        *)
            echo "usage"
            ;;
    esac
done
shift $(($OPTIND - 1))

SUBCOMMAND+="$1".sh
shift 1

[[ ${@: -1} == '-' ]] && {
    sponge $BUFFER < /dev/tty
}

. $SUBCOMMAND "$@" $BUFFER
