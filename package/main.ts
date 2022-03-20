#!/usr/bin/env node
import { program } from 'commander';
import { version, list } from './shell';
program.option('-v, --version').action(async () => {
  await version();
});

program.option('-l, --list').action(async () => {
  await list();
});
program.parse(process.argv);
