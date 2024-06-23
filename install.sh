#!/bin/bash

# Update package list and install prerequisites
sudo apt-get update
sudo apt-get install -y nodejs npm git

# Clone the BKAD-USB repository
git clone https://github.com/bitk1/BKAD-USB.git

# Navigate to the project directory
cd BKAD-USB

# Install project dependencies
npm install

# Start the Electron app
npm start

