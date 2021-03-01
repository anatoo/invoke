#!/usr/bin/env node

try {
  require('ts-node/register/transpile-only');
} catch (error) {
  // do nothing
}

require('../dist/index').cli();
