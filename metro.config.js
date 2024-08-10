// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

// Get the default config from Expo
const config = getDefaultConfig(__dirname);

// Update resolver configuration
config.resolver = {
  ...config.resolver,
  blockList: [
    /node_modules\/expo\/build\/Expo.fx.js/, // Block problematic file
    // Add other patterns if needed
  ],
};

module.exports = config;
