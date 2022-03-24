import { list } from './list';
import { version } from './version';
import { BaseCmd } from './../../type/shell.type';
export const baseAction = async (cmd: BaseCmd) => {
  if (cmd.version) await version();
  if (cmd.list) await list();
};
