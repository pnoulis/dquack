#!/bin/bash

# Utils
URL=
ROUTE=
PREFIX='/'

## ---------------------- ROUTES ------------------------ ##
## ------------------------------------------------------ ##
function home {
    URL="$(makeURL $PREFIX)"
    [[ $? -gt 0 ]] && {
        echo "$SCRIPT": no route
        exit 1
    }
    echo home
}

## -------------------- PARSE ARGS ---------------------- ##
## ------------------------------------------------------ ##
ROUTE=$1
shift
case $ROUTE in
    home)
        home "$@"
        ;;
    *)
        echo 'help'
        exit 1
        ;;
esac
