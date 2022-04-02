import { promises } from 'fs';
const { readFile } = promises;
import { ShellCliJson } from '../type/shell.type';

/**
 * 获取内部库的shell
 * @param path
 * @returns
 */
export const getFileShells = async (rootPath: string) => {
  const fileBuffer = await readFile(rootPath, 'utf-8');
  const shells = fileBuffer ? (JSON.parse(fileBuffer.toString()) as ShellCliJson) : null;
  return shells;
};
