#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
echo "DIR is $DIR"
mkdir -p "$DIR/bin"
zip "$DIR/bin/todoApp.zip" -r "$DIR" .[^.] -x bin -x build.sh