#!/bin/bash

# Utils
URL=
ROUTE=
PREFIX='/'

## ---------------------- ROUTES ------------------------ ##
## ------------------------------------------------------ ##
function home {
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
