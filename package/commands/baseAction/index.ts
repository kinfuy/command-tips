import { list } from './list';
import { version } from './version';

interface BaseCmd {
  version?: boolean;
  list?: boolean;
}
export const baseAction = async (cmd: BaseCmd) => {
  if (cmd.version) await version();
  if (cmd.list) await list();
};
