"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAllSearchQuestions = exports.createQuestions = void 0;
const shell_1 = require("./shell");
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
const createAllSearchQuestions = async () => {
    const shells = await (0, shell_1.getShells)();
    return [
        {
            name: 'search',
            type: 'autocomplete',
            message: '试试搜索一下！',
            emptyText: 'sorry not found',
            source: (answersSoFar, input) => {
                return new Promise(async (resolve, reject) => {
                    if (input) {
                        const matchShell = shells.filter((x) => {
                            return x.cli.includes(input);
                        });
                        resolve(matchShell.map((x) => `${x.cli}(${x.desc})`));
                    }
                    else {
                        resolve([]);
                    }
                });
            },
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
                return shells.some((x) => x.cli === answer['search'] && x.isTemp);
            },
        },
        {
            name: 'newShell',
            type: 'input',
            message: '输入新的shell！',
            default: (answer) => {
                return answer['search'];
            },
            when: (answer) => {
                return answer.isChange;
            },
        },
    ];
};
exports.createAllSearchQuestions = createAllSearchQuestions;
