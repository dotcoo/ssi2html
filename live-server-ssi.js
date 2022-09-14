#!/usr/bin/env node

const path = require('path');

process.argv.push('--middleware='+path.join(__dirname, './middleware.js').replace(/\\/g, '/'));

require('live-server/live-server');
