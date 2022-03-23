#!/usr/bin/env node
import { baseAction } from './commands/baseAction';
import { searchAction } from './commands/searchAction';
import { taskAction } from './commands/taskAction';
import { Command } from 'commander';
const program = new Command();

program
  .option('-v, --version', '查看当前版本')
  .option('-l, --list', '当前支持类库')
  .usage('command <option>')
  .description('命令行提示工具！')
  .action(baseAction);

program
  .command('search')
  .description('search shell of command-tips')
  .alias('s')
  .option('-t, --tag <tag>', '在该类库中检索shell')
  .option('-s, --similar <similar>', '字符串模糊匹配shell')
  .option('-r, --regular <regular>', '正则表达式匹配shell')
  .action(searchAction);
program
  .command('task')
  .alias('t')
  .description('run more shell')
  .option('-a, --async <async>', '异步执行shell')
  .option('-s, --sync <sync>', '同步执行shell')
  .action(taskAction);
program.parse(process.argv);
