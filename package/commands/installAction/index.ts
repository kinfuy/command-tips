import { InstallCmd } from '../../type/shell.type';
import { outputPath } from '../../config/path';
import { resolve } from 'path';
import download from 'download-git-repo';
import { log } from '../../utils/log';
export const installAction = async (install: InstallCmd) => {
  console.log('🔥log=>index=>6:install.name:%o', install.name);
  if (install.name) {
    await download('HitStarrySky/command-tips', resolve(__dirname, '../../test'), (err: any) => {
      log;
    });
  }
};
