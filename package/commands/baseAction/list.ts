import { log } from '../../utils/log';
import { getFileName } from '../../utils/getFile';
export const list = async () => {
  const shells = await getFileName('json');
  if (shells.length > 0) {
    log.success('ShellCommandToolTips支持命令库如下:');
    shells.forEach((x) => log.info(x));
  } else {
    log.success('ShellCommandToolTips暂未添加任何命令库！');
  }
};
