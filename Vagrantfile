# -*- mode: ruby -*-
# vi: set ft=ruby :

PROJECT_NAME = "gravity-world"

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.box = "trusty32"
  config.vm.box_url = "https://atlas.hashicorp.com/ubuntu/boxes/trusty32/versions/14.04/providers/virtualbox.box"

  config.vm.synced_folder ".", "/home/vagrant/" + PROJECT_NAME
  config.vm.network :forwarded_port, guest: 7777, host: 7777

  config.vm.provision :shell, :path => "bin/vagrant-provision.sh"
  config.vm.provision "file", source: "~/.gitconfig", destination: ".gitconfig"
end
