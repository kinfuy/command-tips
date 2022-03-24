import { log } from '../../utils/log';
import { libsoutputPath } from '../../config/path';
import inquirer from 'inquirer';
import inquirerPrompt from 'inquirer-autocomplete-prompt';
inquirer.registerPrompt('autocomplete', inquirerPrompt);

import { createQuestions, createAllSearchQuestions } from '../../utils/answer';
import { SearchCmd, ShellInfo } from '../../type/shell.type';
import { getFiles } from '../../utils/getFile';
import { getFileShells } from './../../utils/getLibsShell';
import { runShell } from '../../utils/shell';
export const searchAction = async (cmd: SearchCmd) => {
  if (cmd.tag) {
    await tagSearch(cmd.tag);
    return;
  }
  if (cmd.similar) {
    await similarSearch(cmd.similar);
    return;
  }
  await defaultSearch();
};

/**
 * 根据tag搜索shell
 * @param tag
 */
async function tagSearch(tag: string) {
  try {
    const shells = await getFileShells(`${libsoutputPath}/${tag}.json`);
    if (shells) {
      const shellQuestion = createQuestions('shell', shells.shell);
      const { shell, isChange, newShell } = await inquirer.prompt(shellQuestion);
      const editorShell = isChange ? newShell : shell;
      log.info(`正在执行:${editorShell}`);
      runShell(editorShell)
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

async function similarSearch(similar: string) {
  let shells: ShellInfo[] = [];
  const shellFiles = await getFiles('json');

  for (let i = 0; i < shellFiles.length; i++) {
    const shell = await getFileShells(shellFiles[i]);
    shell && shells.push(...shell.shell);
  }
  const matchShell = shells.filter((x) => {
    return similar && (x.cli.includes(similar) || x.desc.includes(similar));
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
/**
 * 默认搜索
 */
async function defaultSearch() {
  const question = await createAllSearchQuestions();
  const { search, isChange, newShell } = await inquirer.prompt(question);
  const editorShell = isChange ? newShell : search;
  log.info(`正在执行:${editorShell}`);
  runShell(editorShell)
    .then((msg) => {
      log.success(msg);
    })
    .catch((err) => {
      log.error(err);
    });
}
