#!/usr/bin/env node
import { program } from 'commander';
import { version } from './shell/version';
program.option('-v').action(async () => {
  await version();
});
program.parse(process.argv);
