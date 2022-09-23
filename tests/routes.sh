#!/bin/bash

#
# url encoding table:
# https://www.w3schools.com/tags/ref_urlencode.ASP
#
# quick ref:
# / %2F
# - %2D
# . %2E
# : %3A


# Example parsind arguments both top level and subcommands and a mix of the two
# while getopts "as" opt; do
#     case "$opt" in
#         a) # all
#             echo "run all routes"
#             ;;
#         s)
#             SILENT="--silent"
#             ;;
#         *)
#             echo "usage"
#             ;;
#     esac
# done

# shift $(($OPTIND - 1));

# route="$1";

# if [ ! -z "$route" ]; then
#     [[ $OPTIND -eq 1 ]] && shift
#     "$route" "$@"
# fi

# function stopService() {
#     while getopts "f" opt; do
#         case "$opt" in
#             f) # all
#                 echo "test all routes"
#                 ;;
#             *)
#                 echo "usage"
#                 ;;
#         esac
#     done

#     curl \
#         "${SILENT}" \
#         --request 'DELETE' \
#         --header 'Content-Type: application/json' \
#         --header 'Connection: close' \
#         --data "$1" \
#         "${SERVER}/service/${2}?user=${USER}&app=${APP_NAME}"
#
# }


SILENT=
VERBOSE=
SERVER='localhost:8080'
USER='pavlos'
APP_NAME='app_name'
aContainer='mssql%3A2019%2Dlatest'
data='{
  "custom_settings": "pavlos"
  }'

function listServices() {
    curl \
        --silent \
        --request 'GET' \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --header 'Connection: close' \
        "${SERVER}/service?user=${USER}&app=${APP_NAME}"
    echo
}

# Params
# @data
# @serviceID
function procureService() {
    curl \
        --silent \
        --request 'GET' \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --header 'Connection: close' \
        "${SERVER}/service/${2}?user=${USER}&app=${APP_NAME}"
    echo
}

# Params
# @data
# @serviceID
function startService() {
    curl \
        --silent \
        --request 'POST' \
        --header 'Content-Type: application/json' \
        --header 'Connection: close' \
        --data "$1" \
        "${SERVER}/service/${2}?user=${USER}&app=${APP_NAME}"
    echo
}

# Params
# @data
# @serviceID
function stopService() {
    curl \
        ${SILENT} \
        ${VERBOSE} \
        --request 'DELETE' \
        --header 'Content-Type: application/json' \
        --header 'Connection: close' \
        --data "$1" \
        "${SERVER}/service/${2}?user=${USER}&app=${APP_NAME}"
}

function listAssets() {
    curl \
        ${SILENT} \
        ${VERBOSE} \
        --request 'GET' \
        --header 'Connection: Close' \
        "${SERVER}/assets/"
}

function home() {
    curl \
        ${SILENT} \
        ${VERBOSE} \
        --request 'GET' \
        --header 'Connection: Close' \
        "${SERVER}/"
}

while getopts "asv" opt; do
    case "$opt" in
        a) # all
            echo "run all routes"
            ;;
        s)
            SILENT="--silent"
            ;;
        v)
            VERBOSE='--verbose'
            ;;
        *)
            echo "usage"
            ;;
    esac
done

shift $(($OPTIND - 1));

route="$1";

if [ ! -z "$route" ]; then
    [[ $OPTIND -eq 1 ]] && shift
    "$route" "$@"
fi
