"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuestions = void 0;
const createQuestions = (name, shell) => {
    const questions = [
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
            default: (answer) => {
                return answer[name];
            },
            when: (answer) => {
                return answer.isChange;
            },
        },
    ];
    return questions;
};
exports.createQuestions = createQuestions;
