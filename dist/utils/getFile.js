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
exports.getFileName = exports.getFiles = void 0;
const fast_glob_1 = __importDefault(require("fast-glob"));
const path_1 = __importDefault(require("path"));
/**
 * 获取文件
 * @param sufix 后缀
 * @param dir 地址：默认libs
 * @returns
 */
const getFiles = (sufix, dir = 'libs') => __awaiter(void 0, void 0, void 0, function* () {
    const rootPath = yield path_1.default.resolve(__dirname, `../${dir}`);
    return (0, fast_glob_1.default)(`*.${sufix}`, { cwd: rootPath, absolute: true });
});
exports.getFiles = getFiles;
const getFileName = (sufix) => __awaiter(void 0, void 0, void 0, function* () {
    const fileList = yield (0, exports.getFiles)(sufix);
    return fileList.map((file) => path_1.default.basename(file).replace(`.${sufix}`, ''));
});
exports.getFileName = getFileName;
