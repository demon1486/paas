# -*- mode: ruby -*-
# vi: set ft=ruby :

$install_deps = <<-SHELL
  # Update and install necessary packages
  sudo apt-get update -y
  sudo apt-get install openjdk-17-jdk openjdk-17-jre curl wget zip tree -y
  # for webgui
  # sudo apt install -y xfce4 xfce4-terminal

  # Switch to vagrant user for installing SDKMAN!, NVM, and npm
  sudo -u vagrant bash -c '

  # Install SDKMAN! and Gradle
  curl -s "https://get.sdkman.io" | bash
  source "$HOME/.sdkman/bin/sdkman-init.sh"
  sdk install gradle

  # Install NVM
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
  source "$HOME/.nvm/nvm.sh"
  nvm install 22

  # Install webpack-cli using npm
  npm install --save-dev webpack-cli

  # Debugging output
  echo "node version: $(node -v)"
  echo "nvm version: $(nvm current)"
  echo "npm version: $(npm -v)"
  echo "gradle version: $(gradle -v)"
#   cd /vagrant
#   npm start -- --p 5000 --cp 3000

  '
SHELL

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/jammy64"
  config.vm.network "private_network", ip: "192.168.100.100"
  config.vm.network "forwarded_port", guest: 8080, host: 8080
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "4096"
    vb.cpus = 2
#     vb.gui = true   # Enable GUI
  end

  config.vm.provision "shell", inline: $install_deps
end
