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
exports.buildLib = void 0;
const chalk_1 = __importDefault(require("chalk"));
const rollup_1 = __importDefault(require("rollup"));
const path_1 = require("./config/path");
const rollup_plugin_node_resolve_1 = __importDefault(require("rollup-plugin-node-resolve")); // 依赖引用插件
const rollup_plugin_commonjs_1 = __importDefault(require("rollup-plugin-commonjs")); // commonjs模块转换插件
const rollup_plugin_typescript2_1 = __importDefault(require("rollup-plugin-typescript2"));
const getBundle = () => __awaiter(void 0, void 0, void 0, function* () {
    const bundle = yield rollup_1.default.rollup({
        input: path_1.enterPathDir + 'main.ts',
        output: {
            dir: path_1.outPathDir,
        },
        plugins: [(0, rollup_plugin_node_resolve_1.default)(), (0, rollup_plugin_commonjs_1.default)(), (0, rollup_plugin_typescript2_1.default)()],
        external: ['.js', '.ts', '.tsx'],
    });
    return bundle;
});
const buildLib = () => __awaiter(void 0, void 0, void 0, function* () {
    console.info(chalk_1.default.blue('building...'));
    const bundle = yield getBundle();
    const task = [
        bundle.write({
            format: 'cjs',
            file: `enterPathDir/main.js`,
        }),
    ];
    yield Promise.all(task);
});
exports.buildLib = buildLib;
