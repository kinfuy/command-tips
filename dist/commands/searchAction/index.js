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
const searchAction = (cmd) => __awaiter(void 0, void 0, void 0, function* () {
    if (cmd.tag) {
        yield tagSearch(cmd.tag);
        return;
    }
    if (cmd.similar) {
        yield similarSearch(cmd.similar);
        return;
    }
    yield defaultSearch();
});
exports.searchAction = searchAction;
/**
 * 根据tag搜索shell
 * @param tag
 */
function tagSearch(tag) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const shells = yield (0, getLibsShell_1.getFileShells)(`${path_1.libsoutputPath}/${tag}.json`);
            if (shells) {
                const shellQuestion = (0, answer_1.createQuestions)('shell', shells.shell);
                const { shell, isChange, newShell } = yield inquirer_1.default.prompt(shellQuestion);
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
    });
}
function similarSearch(similar) {
    return __awaiter(this, void 0, void 0, function* () {
        let shells = [];
        const shellFiles = yield (0, getFile_1.getFiles)('json');
        for (let i = 0; i < shellFiles.length; i++) {
            const shell = yield (0, getLibsShell_1.getFileShells)(shellFiles[i]);
            shell && shells.push(...shell.shell);
        }
        const matchShell = shells.filter((x) => {
            return similar && (x.cli.includes(similar) || x.desc.includes(similar));
        });
        if (matchShell.length > 0) {
            const shellQuestion = (0, answer_1.createQuestions)('shell', matchShell);
            const { shell } = yield inquirer_1.default.prompt(shellQuestion);
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
    });
}
/**
 * 默认搜索
 */
function defaultSearch() {
    return __awaiter(this, void 0, void 0, function* () {
        const question = yield (0, answer_1.createAllSearchQuestions)();
        const { search, isChange, newShell } = yield inquirer_1.default.prompt(question);
        const editorShell = isChange ? newShell : search;
        log_1.log.info(`正在执行:${editorShell}`);
        (0, shell_1.runShell)(editorShell)
            .then((msg) => {
            log_1.log.success(msg);
        })
            .catch((err) => {
            log_1.log.error(err);
        });
    });
}
