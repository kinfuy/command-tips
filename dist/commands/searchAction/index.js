"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchAction = void 0;
const log_1 = require("../../utils/log");
const path_1 = require("../../config/path");
const inquirer_1 = __importDefault(require("inquirer"));
const inquirer_autocomplete_prompt_1 = __importDefault(require("inquirer-autocomplete-prompt"));
inquirer_1.default.registerPrompt('autocomplete', inquirer_autocomplete_prompt_1.default);
const answer_1 = require("../../utils/answer");
const getFile_1 = require("../../utils/getFile");
const getLibsShell_1 = require("./../../utils/getLibsShell");
const shell_1 = require("../../utils/shell");
const searchAction = async (cmd) => {
    if (cmd.tag) {
        await tagSearch(cmd.tag);
        return;
    }
    if (cmd.similar) {
        await similarSearch(cmd.similar);
        return;
    }
    await defaultSearch();
};
exports.searchAction = searchAction;
/**
 * 根据tag搜索shell
 * @param tag
 */
async function tagSearch(tag) {
    try {
        const shells = await (0, getLibsShell_1.getFileShells)(`${path_1.libsoutputPath}/${tag}.json`);
        if (shells) {
            const shellQuestion = (0, answer_1.createQuestions)('shell', shells.shell);
            const { shell, isChange, newShell } = await inquirer_1.default.prompt(shellQuestion);
            const editorShell = isChange ? newShell : shell;
            log_1.log.info(`正在执行:${editorShell}`);
            (0, shell_1.runShell)(editorShell)
                .then((msg) => {
                log_1.log.success(msg);
            })
                .catch((err) => {
                log_1.log.error(err);
            });
        }
        else {
            log_1.log.warning('该命令库没有shell');
        }
    }
    catch (error) {
        log_1.log.warning('没有检索到该命令库！');
    }
}
async function similarSearch(similar) {
    let shells = [];
    const shellFiles = await (0, getFile_1.getFiles)('json');
    for (let i = 0; i < shellFiles.length; i++) {
        const shell = await (0, getLibsShell_1.getFileShells)(shellFiles[i]);
        shell && shells.push(...shell.shell);
    }
    const matchShell = shells.filter((x) => {
        return similar && (x.cli.includes(similar) || x.desc.includes(similar));
    });
    if (matchShell.length > 0) {
        const shellQuestion = (0, answer_1.createQuestions)('shell', matchShell);
        const { shell } = await inquirer_1.default.prompt(shellQuestion);
        log_1.log.info(`正在执行:${shell}`);
        (0, shell_1.runShell)(shell)
            .then((msg) => {
            log_1.log.success(msg);
        })
            .catch((err) => {
            log_1.log.error(err);
        });
    }
    else {
        log_1.log.warning(`暂无匹配shell`);
    }
}
/**
 * 默认搜索
 */
async function defaultSearch() {
    const question = await (0, answer_1.createAllSearchQuestions)();
    const { search, isChange, newShell } = await inquirer_1.default.prompt(question);
    const editorShell = isChange ? newShell : search;
    log_1.log.info(`正在执行:${editorShell}`);
    (0, shell_1.runShell)(editorShell)
        .then((msg) => {
        log_1.log.success(msg);
    })
        .catch((err) => {
        log_1.log.error(err);
    });
}
