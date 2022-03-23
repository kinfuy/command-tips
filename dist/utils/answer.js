"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuestions = void 0;
const createQuestions = (name, shell) => {
    const questions = [];
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
exports.createQuestions = createQuestions;
