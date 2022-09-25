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


NL=$'\n'
BUFFER=
SILENT=
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
SOURCE_DIR=$(realpath ${SCRIPT_DIR}/..)
VERBOSE="--verbose"
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

function createAsset() {
    while getopts 'f' opt; do
        case $opt in
            f)
                BUFFER=$OPTARG
                ;;
            *)
                echo usage
                ;;
        esac
    done
    shift $(($OPTIND - 1));

    [[ -z "$BUFFER" ]] && {
        cat "${SOURCE_DIR}/assets/templates/Dockerfile"
        exit 0
    }
    curl \
        ${SILENT} \
        ${VERBOSE} \
        --request 'POST' \
        --header 'Content-Type: text/plain; charset=UTF-8' \
        --header 'Connection: Close' \
        --data "$BUFFER" \
        "${SERVER}/assets"
}


function rmImages() {
    docker image rm $(docker image ls --quiet --filter 'reference=dquack/*')
}

if [[ -p /dev/stdin ]]; then # pipe
    while read -r stdin; do
        BUFFER+="${stdin}${NL}"
    done
fi
if [[ ! -t 0  && ! -p /dev/stdin ]]; then # redirection
    while read -r stdin; do
        BUFFER+="${stdin}${NL}"
    done
fi

while getopts "asv" opt; do
    case "$opt" in
        a) # all
            echo "run all routes"
            ;;
        s)
            SILENT="--silent"
            ;;
        v)
            VERBOSE=''
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
