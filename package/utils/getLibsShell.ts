import { readFile } from 'fs/promises';
import { ShellCliJson } from '../type/shell.type';

/**
 * 获取文件内的shell
 * @param path
 * @returns
 */
export const getFileShells = async (path: string) => {
  const fileBuffer = await readFile(path, 'utf-8');
  const shells = fileBuffer ? (JSON.parse(fileBuffer.toString()) as ShellCliJson) : null;
  return shells;
};
