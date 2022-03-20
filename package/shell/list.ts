import { readdir } from 'fs/promises';
import { log } from '../libs/log';
import { resolve } from 'path';
import inquirer from 'inquirer';
export const list = async () => {
  const shells = await readdir(resolve(__dirname, '../template'));
  await inquirer
    .prompt([
      {
        type: 'list',
        name: 'namespace',
        message: 'tips list！',
        choices: shells.map((x) => {
          return {
            name: x,
            value: x,
          };
        }),
      },
    ])
    .then((answers) => {
      // 打印互用输入结果
      console.log(answers);
      log.success(answers.namespace);
    });
};
