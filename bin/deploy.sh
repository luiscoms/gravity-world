#!/bin/sh

#BIN_DIR=$(readlink -f $(dirname $0));
BIN_DIR=$(pwd)/$(dirname $0);
DIRFROM="~/tmp/";
DIRTO="~/www/labs/gravity-world/";

echo $BIN_DIR
cd $BIN_DIR/../
#npm install
grunt

cd build

# zip filename -r files
zip ../gravity-world -r .

cd ..

ssh luiscoms@luiscoms.com.br "rm -rf "$DIRFROM"; mkdir -p "$DIRFROM

# scp -r build luiscoms@luiscoms.com.br:$DIRFROM
scp gravity-world.zip luiscoms@luiscoms.com.br:$DIRFROM

ssh luiscoms@luiscoms.com.br "unzip -o "$DIRFROM/gravity-world.zip" -d "$DIRTO
# ssh luiscoms@luiscoms.com.br "rsync -ruv "$DIRFROM" "$DIRTO

rm gravity-world.zip
