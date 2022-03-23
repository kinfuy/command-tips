#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseAction_1 = require("./commands/baseAction");
const searchAction_1 = require("./commands/searchAction");
const taskAction_1 = require("./commands/taskAction");
const commander_1 = require("commander");
const program = new commander_1.Command();
program
    .option('-v, --version', '查看当前版本')
    .option('-l, --list', '当前支持类库')
    .usage('command <option>')
    .description('命令行提示工具！')
    .action(baseAction_1.baseAction);
program
    .command('search')
    .description('search shell of command-tips')
    .alias('s')
    .option('-t, --tag <tag>', '在该类库中检索shell')
    .option('-s, --similar <similar>', '字符串模糊匹配shell')
    .option('-r, --regular <regular>', '正则表达式匹配shell')
    .action(searchAction_1.searchAction);
program
    .command('task')
    .alias('t')
    .description('run more shell')
    .option('-a, --async <async>', '异步执行shell')
    .option('-s, --sync <sync>', '同步执行shell')
    .action(taskAction_1.taskAction);
program.parse(process.argv);
