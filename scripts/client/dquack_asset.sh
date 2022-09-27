#/bin/bash

# Options
TEST=
VERBOSE=
BUFFER=

## ---------------------------------------------------------
## ---------------------------------------------------------

while getopts 'tvb:' option; do
    case $option in
        t)
            TEST=0
            ;;
        v)
            VERBOSE='--verbose'
            ;;
        b)
            [[ -s $OPTARG ]] && BUFFER=$OPTARG
            ;;
        *)
            echo "usage"
            ;;
    esac
done
shift $(($OPTIND - 1))
