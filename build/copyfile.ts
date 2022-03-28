import { resolve, join, basename } from 'path';
import { copyFile, mkdir, access } from 'fs/promises';
import { rootPath, outputPath, libsEnterPath, libsoutputPath } from './config/path';
import { getFiles } from '../package/utils/getFile';

const moveDir = async (files: string[]) => {
  await access(libsoutputPath).catch(() => mkdir(libsoutputPath));
  files.forEach(async (x) => {
    await copyFile(x, join(libsoutputPath, basename(x)));
  });
};
export const copyFiles = async () => {
  const files = await getFiles('json', libsEnterPath);
  Promise.all([
    copyFile(resolve(rootPath, 'package.json'), resolve(outputPath, 'package.json')),
    copyFile(resolve(rootPath, 'README.md'), resolve(outputPath, 'README.md')),
    moveDir(files),
  ]);
};
