import { QuestionCollection } from 'inquirer';
import { ShellInfo } from '../type/shell.type';
export const createQuestions = (name: string, shell: ShellInfo[]): QuestionCollection[] => {
  const questions: QuestionCollection[] = [];
  questions.push({
    name: name,
    type: 'list',
    message: '需要执行的命令？',
    choices: shell.map((x) => `${x.cli}(${x.desc})`),
    filter: (val) => {
      const cli = val.replace(/\(.*\)$/, '');
      return cli;
    },
  });
  return questions;
};
