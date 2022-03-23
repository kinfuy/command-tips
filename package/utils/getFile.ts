import glob from 'fast-glob';
import path from 'path';

/**
 * 获取文件
 * @param sufix 后缀
 * @param dir 地址：默认libs
 * @returns
 */
export const getFiles = async (sufix: string, dir: string = 'libs') => {
  const rootPath = await path.resolve(__dirname, `../${dir}`);
  return glob(`*.${sufix}`, { cwd: rootPath, absolute: true });
};

export const getFileName = async (sufix: string) => {
  const fileList = await getFiles(sufix);
  return fileList.map((file) => path.basename(file).replace(`.${sufix}`, ''));
};
