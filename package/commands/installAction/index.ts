import { InstallCmd } from '../../type/shell.type';
import { cwd } from 'process';
import { join } from 'path';
import ora from 'ora';
import download from 'download-git-repo';
export const installAction = async (install: InstallCmd) => {
  if (install.name) {
    await downloadTemplate(install.name);
  }
  if (install.author) {
    await downloadTemplate(`HitStarrySky/${install.author}`);
  }
};

async function downloadTemplate(name: string) {
  const spinner = ora('模板拉去中...').start();
  const template = name.slice(name.lastIndexOf('/'));
  await download(name, join(cwd(), `${template}`), (err: any) => {
    if (err) spinner.fail(`${name}:模板拉取失败！`);
    else {
      spinner.succeed(`${name}:模板下载成功！`);
    }
  });
}
