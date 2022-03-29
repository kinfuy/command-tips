import { AddCmd, ShellCliJson, ShellInfo } from '../../type/shell.type';
import { isAbsolute, resolve } from 'path';
import { rootPath, libsoutputPath } from '../../config/path';
import { log } from '../../utils/log';
import { getFileShells } from '../../utils/getLibsShell';
import { createAddQuestions } from '../../utils/answer';
import inquirer from 'inquirer';
import { promises } from 'fs';
const { writeFile } = promises;
export const addAction = async (cmd: AddCmd) => {
  console.log('🔥log=>index=>10:cmd:%o', cmd);
  const question = await createAddQuestions(cmd);
  const { filePath, shell, shellDesc, addPath, newLibs, isChange } = await inquirer.prompt(question);

  const newLibName = addPath === '_NEW_' ? newLibs : addPath;
  const newFilePath = cmd.file || filePath;
  const newShellName = cmd.shell || shell;
  const isTemp = isChange || false;

  if (cmd.shell && cmd.file) {
    log.warning('不同同时指定文件，和shell');
    return;
  }
  if (newShellName) {
    if (addPath === '_NEW_') {
      const data: ShellCliJson = {
        name: newLibName,
        shell: [
          {
            cli: newShellName,
            isTemp,
            desc: shellDesc,
          },
        ],
      };
      await writeFileShell(resolve(libsoutputPath, `${newLibName}.json`), data);
      log.success(`${newShellName}: 添加成功！`);
    } else {
      const oldShells = await getFileShells(resolve(libsoutputPath, `${newLibName}.json`));
      let flag = false;
      if (!oldShells) {
        log.error('该库似乎被外星人抓走了');
        return;
      }
      oldShells.shell.forEach((x) => {
        if (x.cli === newShellName) {
          x.desc = shellDesc;
          x.isTemp = isTemp;
          flag = true;
        }
      });
      if (flag) log.success(`${newShellName}: 更新成功！`);
      else {
        oldShells?.shell.push({
          cli: newShellName,
          isTemp,
          desc: shellDesc,
        });
      }
      if (oldShells) await writeFileShell(resolve(libsoutputPath, `${newLibName}.json`), oldShells);
    }
  }
  if (newFilePath) {
    const newShells = await getOutFileShell(newFilePath);
    if (addPath === '_NEW_') {
      if (newShells) {
        const data: ShellCliJson = {
          name: newLibName,
          shell: newShells.shell,
        };
        newShells.shell.forEach((x) => log.info(`${x.cli}: 已添加`));
        await writeFileShell(resolve(libsoutputPath, `${newLibName}.json`), data);
      } else {
        log.error(`${newFilePath}: is not found`);
        process.exit(0);
      }
    } else {
      const oldShells = await getFileShells(resolve(libsoutputPath, `${newLibName}.json`));
      if (oldShells && newShells) {
        oldShells.shell.forEach((x) => {
          for (let i = 0; i < newShells.shell.length; i++) {
            if (newShells.shell[i].cli === x.cli) {
              x.desc = newShells.shell[i].desc;
              x.isTemp = newShells.shell[i].isTemp;
              log.info(`${x.cli}:已经更新`);
              newShells.shell.splice(i, 1);
              i--;
            }
          }
        });
        newShells.shell.forEach((x) => log.info(`${x.cli}: 已添加`));
        oldShells.shell = [...oldShells.shell, ...newShells.shell];
      }
      if (oldShells) await writeFileShell(resolve(libsoutputPath, `${newLibName}.json`), oldShells);
    }
  }
};

/**
 * 获取指定路径的shell
 * @param dir 可以是绝对路径 相对路径（从当前控制工作区开始）
 * @returns
 */
async function getOutFileShell(dir: string) {
  let shellPath = '';
  if (isAbsolute(dir)) shellPath = dir;
  else shellPath = resolve(rootPath, dir);
  try {
    const fileInfo = await getFileShells(shellPath);
    return fileInfo;
  } catch (error) {
    log.error(error as string);
    process.exit(0);
  }
}

/**
 * 将shell写入文件
 * @param dir
 * @param data
 */
async function writeFileShell(dir: string, data: ShellCliJson) {
  writeFile(dir, JSON.stringify(data, null, 4)).catch((error) => {
    log.error(error as string);
    process.exit(0);
  });
}
