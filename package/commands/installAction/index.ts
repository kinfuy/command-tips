import { InstallCmd } from '../../type/shell.type';
import { rootPath } from '../../config/path';
import { join } from 'path';
import ora from 'ora';
import download from 'download-git-repo';
export const installAction = async (install: InstallCmd) => {
  if (install.name) {
    const spinner = ora('模板拉去中...').start();
    const repo = `HitStarrySky/${install.name}`;
    await download(repo, join(rootPath, `${install.name}`), (err: any) => {
      if (err) spinner.fail(`${install.name}:模板拉取失败！`);
      else {
        spinner.succeed(`${install.name}:模板下载成功！`);
      }
    });
  }
};
