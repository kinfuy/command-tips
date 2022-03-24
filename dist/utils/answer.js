"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const createAllSearchQuestions = () => __awaiter(void 0, void 0, void 0, function* () {
    const shells = yield (0, shell_1.getShells)();
    return [
        {
            name: 'search',
            type: 'autocomplete',
            message: '试试搜索一下！',
            emptyText: 'sorry not found',
            source: (answersSoFar, input) => {
                return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
                    if (input) {
                        const matchShell = shells.filter((x) => {
                            return x.cli.includes(input);
                        });
                        resolve(matchShell.map((x) => `${x.cli}(${x.desc})`));
                    }
                    else {
                        resolve([]);
                    }
                }));
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
});
exports.createAllSearchQuestions = createAllSearchQuestions;
