#!/bin/bash

# Update package list and install prerequisites
sudo apt-get update
sudo apt-get install -y nodejs npm git

# Navigate to the React project directory
cd bkad-usb-react

# Install project dependencies
npm install

# Set NODE_OPTIONS environment variable
export NODE_OPTIONS=--openssl-legacy-provider

# Build the React app
npm run build

# Install serve globally
sudo npm install -g serve

# Serve the React app
serve -s build

