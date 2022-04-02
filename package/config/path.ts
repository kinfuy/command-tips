// 基于打包后的路径
import { resolve } from 'path';
export const rootPath = __dirname;
export const outputPath = __dirname;
export const enterPath = resolve(rootPath, 'package');

export const libsEnterPath = resolve(enterPath, 'libs');
export const libsoutputPath = resolve(outputPath, 'libs');
