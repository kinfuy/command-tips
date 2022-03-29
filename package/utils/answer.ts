import type { QuestionCollection } from 'inquirer';
import type { AutocompleteQuestionOptions } from 'inquirer-autocomplete-prompt';
import { AddCmd, ShellInfo } from '../type/shell.type';
import { getFileName } from './getFile';
import { getShells } from './shell';

// 运行shell问题
export const createQuestions = (name: string, shell: ShellInfo[]): QuestionCollection[] => {
  const questions: QuestionCollection[] = [
    {
      name: name,
      type: 'list',
      message: '请选择需要执行的命令？',
      choices: shell.map((x) => {
        return {
          value: x,
          name: `${x.cli}(${x.desc})`,
        };
      }),
    },
    {
      name: 'isChange',
      type: 'confirm',
      message: '是否需要修改shell？',
      when: (answer: any) => {
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
      when: (answer: any) => {
        return answer.isChange;
      },
    },
  ];
  return questions;
};

// 全局搜索问题
export const createAllSearchQuestions = async (): Promise<AutocompleteQuestionOptions[] | QuestionCollection[]> => {
  const shells = await getShells();
  return [
    {
      name: 'search',
      type: 'autocomplete',
      message: '试试搜索一下！',
      // @ts-ignore
      emptyText: 'sorry not found',
      source: (answersSoFar, input) => {
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
      when: (answer) => {
        return shells.some((x) => x.cli === answer['search'] && x.isTemp);
      },
    },
    {
      name: 'newShell',
      type: 'input',
      message: '输入新的shell！',
      default: (answer: { [x: string]: any }) => {
        return answer['search'];
      },
      when: (answer) => {
        return answer.isChange;
      },
    },
  ];
};

// shell添加问题
export const createAddQuestions = async (cmd: AddCmd): Promise<QuestionCollection[]> => {
  const shellFilesName = await getFileName('json');
  const libs = shellFilesName.map((x) => {
    return {
      value: x,
      name: x,
    };
  });
  return [
    {
      name: 'addType',
      type: 'list',
      message: '请选择添加的类型',
      choices: [
        { value: 'file', name: '指定文件' },
        { value: 'shell', name: '单个shell' },
      ],
      when: () => {
        return !cmd.file && !cmd.shell;
      },
    },
    {
      name: 'filePath',
      type: 'input',
      message: '请输入文件地址（绝对路径，相对路径（当前工作区））',
      when: (answer: any) => {
        return answer.addType === 'file' && !cmd.file;
      },
    },
    {
      name: 'shell',
      type: 'input',
      message: '请输入shell',
      when: (answer: any) => {
        return answer.addType === 'shell' && !cmd.shell;
      },
    },
    {
      name: 'shellDesc',
      type: 'input',
      message: '请简短的介绍一下该shell',
      when: (answer: any) => {
        return answer.addType === 'shell' && !cmd.shell;
      },
    },
    {
      name: 'isChange',
      type: 'confirm',
      message: '运行前是否可编辑shell？',
      when: (answer: any) => {
        return cmd.change === undefined && answer.addType === 'shell';
      },
    },
    {
      name: 'addPath',
      type: 'list',
      message: '请选择添加的libs库',
      choices: [...libs, { value: '_NEW_', name: '新建libs' }],
    },
    {
      name: 'newLibs',
      type: 'input',
      message: '请输入new libs name',
      when: (answer: any) => {
        return answer.addPath === '_NEW_';
      },
      validate: (inupt: any) => {
        if (shellFilesName.every((x) => x !== inupt)) return true;
        return `${inupt}：已经存在`;
      },
    },
  ];
};
