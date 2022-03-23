import { log } from '../../utils/log';
import { libsoutputPath } from '../../config/path';
import inquirer from 'inquirer';
import { createQuestions } from '../../utils/answer';
import { SearchCmd, ShellInfo } from '../../type/shell.type';
import { getFiles } from '../../utils/getFile';
import { getFileShells } from './../../utils/getLibsShell';
import { runShell } from '../../utils/shell';
export const searchAction = async (cmd: SearchCmd) => {
  if (cmd.tag) {
    try {
      const shells = await getFileShells(`${libsoutputPath}/${cmd.tag}.json`);
      if (shells) {
        const shellQuestion = createQuestions('shell', shells.shell);
        const { shell } = await inquirer.prompt(shellQuestion);
        log.info(`正在执行:${shell}`);
        runShell(shell)
          .then((msg) => {
            log.success(msg);
          })
          .catch((err) => {
            log.error(err);
          });
      } else {
        log.warning('该命令库没有shell');
      }
    } catch (error) {
      log.warning('没有检索到该命令库！');
    }
  }
  if (cmd.similar) {
    let shells: ShellInfo[] = [];
    const shellFiles = await getFiles('json');

    for (let i = 0; i < shellFiles.length; i++) {
      const shell = await getFileShells(shellFiles[i]);
      shell && shells.push(...shell.shell);
    }
    const matchShell = shells.filter((x) => {
      return cmd.similar && (x.cli.includes(cmd.similar) || x.desc.includes(cmd.similar));
    });
    if (matchShell.length > 0) {
      const shellQuestion = createQuestions('shell', matchShell);
      const { shell } = await inquirer.prompt(shellQuestion);
      log.info(`正在执行:${shell}`);
      runShell(shell)
        .then((msg) => {
          log.success(msg);
        })
        .catch((err) => {
          log.error(err);
        });
    } else {
      log.warning(`暂无匹配shell`);
    }
  }
  if (cmd.regular) {
    log.success(cmd.regular);
  }
};
