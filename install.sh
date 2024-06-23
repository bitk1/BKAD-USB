#!/bin/bash

# Update package list and install prerequisites
sudo apt-get update
sudo apt-get install -y nodejs npm git

# Clone the BKAD-USB repository
git clone https://github.com/bitk1/BKAD-USB.git

# Navigate to the React project directory
cd BKAD-USB/bkad-usb-react

# Install project dependencies
npm install

# Build the React app
npm run build

# Install serve globally
sudo npm install -g serve

# Serve the React app
serve -s build

