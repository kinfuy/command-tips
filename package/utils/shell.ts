import shellJs from 'shelljs'; // 非特殊配置同步执行shell
import { ShellInfo } from '../type/shell.type';
import { getFiles } from './getFile';
import { getFileShells } from './getLibsShell';
export const runShell = (shell: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      if (shellJs.exec(shell).code !== 0) {
        reject('shell意外退出！');
      }
      resolve(`执行成功:${shell}`);
    } catch (error) {
      reject(error as string);
    }
  });
};

export const getShells = async () => {
  let shells: ShellInfo[] = [];
  const shellFiles = await getFiles('json');

  for (let i = 0; i < shellFiles.length; i++) {
    const shell = await getFileShells(shellFiles[i]);
    shell && shells.push(...shell.shell);
  }
  return shells;
};
