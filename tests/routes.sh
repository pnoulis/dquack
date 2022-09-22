#!/bin/bash

if [ "$1" ]; then
  sleep $1
fi

#
# url encoding table:
# https://www.w3schools.com/tags/ref_urlencode.ASP
#
# quick ref:
# / %2F
# - %2D
# . %2E
# : %3A

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
    --silent \
    --request 'DELETE' \
    --header 'Content-Type: application/json' \
    --header 'Connection: close' \
    --data "$1" \
    "${SERVER}/service/${2}?user=${USER}&app=${APP_NAME}"
  echo
}

listServices "$data" "$aContainer"
procureService "$data" "$aContainer"
startService "$data" "$aContainer"
stopService "$data" "$aContainer"
