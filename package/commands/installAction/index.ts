import { InstallCmd } from '../../type/shell.type';
import { outputPath } from '../../config/path';
import { resolve } from 'path';
export const installAction = async (install: InstallCmd) => {
  console.log('🔥log=>index=>6:install.name:%o', install.name);
  if (install.name) {
  }
};
