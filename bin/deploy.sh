#!/bin/sh

#BIN_DIR=$(readlink -f $(dirname $0));
BIN_DIR=$(pwd)/$(dirname $0);
DIRFROM="~/tmp/";
DIRTO="~/www/labs/gravity-world/";

echo $BIN_DIR
cd $BIN_DIR/../
#npm install
grunt

ssh luiscoms@luiscoms.com.br "rm -rf "$DIRFROM

scp -r build luiscoms@luiscoms.com.br:$DIRFROM

ssh luiscoms@luiscoms.com.br "rsync -ruv "$DIRFROM" "$DIRTO
