import { baseAction } from './commands/baseAction';
import { searchAction } from './commands/searchAction';
import { installAction } from './commands/installAction';
import { addAction } from './commands/addAction';
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
  .command('add')
  .alias('a')
  .description('添加shell')
  .option('-f, --file <file>', '读取指定文件shell')
  .option('-s, --shell <shell>', '添加shell')
  .option('-c, --change', '是否在运行前提示修改')
  .action(addAction);

program
  .command('install')
  .alias('i')
  .description('install shell libs for githup')
  .option('-a, --author <author>', '从githup:author仓库下载shell libs')
  .option('-n, --name <name>', '从githup，自定义仓库下载shell libs')
  .option('-s, --store <store>', '指定本地文件为命令仓库')
  .action(installAction);
program.parse(process.argv);
