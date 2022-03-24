import { QuestionCollection } from 'inquirer';
import { ShellInfo } from '../type/shell.type';
import { getShells } from './shell';
export const createQuestions = (name: string, shell: ShellInfo[]): QuestionCollection[] => {
  const questions: QuestionCollection[] = [
    {
      name: name,
      type: 'list',
      message: '请选择需要执行的命令？',
      choices: shell.map((x) => `${x.cli}(${x.desc})`),
      filter: (val) => {
        const cli = val.replace(/\(.*\)$/, '');
        return cli;
      },
    },
    {
      name: 'isChange',
      type: 'confirm',
      message: '是否需要修改shell？',
      when: (answer) => {
        return shell.some((x) => x.cli === answer[name] && x.isTemp);
      },
    },
    {
      name: 'newShell',
      type: 'input',
      message: '输入新的shell！',
      default: (answer: any) => {
        return answer[name];
      },
      when: (answer) => {
        return answer.isChange;
      },
    },
  ];
  return questions;
};

export const createAllSearchQuestions = async () => {
  const shells = await getShells();
  return [
    {
      name: 'search',
      type: 'autocomplete',
      message: '试试搜索一下！',
      emptyText: 'sorry not found',
      source: (answersSoFar: any, input: string) => {
        return new Promise(async (resolve, reject) => {
          if (input) {
            const matchShell = shells.filter((x) => {
              return x.cli.includes(input);
            });
            resolve(matchShell.map((x) => `${x.cli}(${x.desc})`));
          } else {
            resolve([]);
          }
        });
      },
      filter: (val: string) => {
        const cli = val.replace(/\(.*\)$/, '');
        return cli;
      },
    },
    {
      name: 'isChange',
      type: 'confirm',
      message: '是否需要修改shell？',
      when: (answer: { [x: string]: string }) => {
        return shells.some((x) => x.cli === answer['search'] && x.isTemp);
      },
    },
    {
      name: 'newShell',
      type: 'input',
      message: '输入新的shell！',
      default: (answer: any) => {
        return answer['search'];
      },
      when: (answer: { isChange: any }) => {
        return answer.isChange;
      },
    },
  ];
};
