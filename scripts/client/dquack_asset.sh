#!/bin/bash

# Utils
URL=
ROUTE=
PREFIX='/asset'

## ---------------------- ROUTES ------------------------ ##
## ------------------------------------------------------ ##
function ls {
    URL="$(makeURL $PREFIX)"
    [[ $? -gt 0 ]] && {
        echo "$SCRIPT": no route
        exit 1
    }
    echo -E args: "$@"
    echo ls
}

function pull {
    URL="$(makeURL $PREFIX)"
    [[ $? -gt 0 ]] && {
        echo "$SCRIPT": no route
        exit 1
    }
    echo -E args: "$@"
    echo ls
}

function push {
    URL="$(makeURL $PREFIX)"
    [[ $? -gt 0 ]] && {
        echo "$SCRIPT": no route
        exit 1
    }
    echo -E args: "$@"
    echo ls
}

function rm {
    URL="$(makeURL $PREFIX)"
    [[ $? -gt 0 ]] && {
        echo "$SCRIPT": no route
        exit 1
    }
    echo -E args: "$@"
    echo ls
}

## -------------------- PARSE ARGS ---------------------- ##
## ------------------------------------------------------ ##
ROUTE=$1
shift
case $ROUTE in
    ls)
        ls "$@"
        ;;
    pull)
        pull "$@"
        ;;
    push)
        push "$@"
        ;;
    rm)
        rm "$@"
        ;;
    *)
        echo 'help'
        exit 1
        ;;
esac
