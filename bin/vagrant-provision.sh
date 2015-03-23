#!/usr/bin/env bash

apt-get update
apt-get install -y git \
                    nodejs npm nodejs-legacy
                    # zip \

# Install command line grunt globaly
npm install -g grunt-cli

# Install sass
# gem install sass

# echo "You've been provisioned"
# date > /etc/vagrant_provisioned_at
