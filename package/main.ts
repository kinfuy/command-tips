import { baseAction } from './commands/baseAction';
import { searchAction } from './commands/searchAction';
import { taskAction } from './commands/taskAction';
import { installAction } from './commands/installAction';
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
  .action(searchAction);
program
  .command('task')
  .alias('t')
  .description('run more shell')
  .option('-a, --async <async>', '异步执行shell')
  .option('-s, --sync <sync>', '同步执行shell')
  .action(taskAction);

program
  .command('install')
  .alias('i')
  .description('install shell libs for githup')
  .option('-n, --name <name>', '从githup下载shell libs')
  .option('-s, --store <store>', '指定本地文件为命令仓库')
  .action(installAction);
program.parse(process.argv);
