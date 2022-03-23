import shellJs from 'shelljs'; // 非特殊配置同步执行shell
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
