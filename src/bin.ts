#!/usr/bin/env node

const { runner } = require('hygen');
const Logger = require('hygen/lib/logger');
const path = require('path');

// These templates will be included in the package
const defaultTemplates = path.join(__dirname, '..', '_templates');

// Use compeller command always
runner(['compeller', ...process.argv.slice(2)], {
  templates: defaultTemplates,
  cwd: process.cwd(),
  logger: new Logger(console.log.bind(console)),
  createPrompter: () => require('enquirer'),
  // @ts-ignore
  exec: (action, body) => {
    const opts = body && body.length > 0 ? { input: body } : {};
    return require('execa').shell(action, opts);
  },
  debug: !!process.env.DEBUG,
});
