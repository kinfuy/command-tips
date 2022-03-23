import { resolve, join, basename } from 'path';
import { copyFile, mkdir, access } from 'fs/promises';
import { rootPath, outputPath, enterPath } from '../package/config/path';
import { getFiles } from '../package/utils/getFile';

const moveDir = async (files: string[]) => {
  await access(`${outputPath}/libs`).catch(() => mkdir(`${outputPath}/libs`));
  files.forEach(async (x) => {
    await copyFile(x, join(`${outputPath}/libs`, basename(x)));
  });
};
export const copyFiles = async () => {
  const files = await getFiles('json');
  Promise.all([
    copyFile(resolve(rootPath, 'package.json'), resolve(outputPath, 'package.json')),
    copyFile(resolve(rootPath, 'README.md'), resolve(outputPath, 'README.md')),
    moveDir(files),
  ]);
};
