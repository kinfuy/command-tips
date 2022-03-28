import { series } from 'gulp';
import { copyFiles } from './copyfile';
import { buildBundle } from './build';
import { run, withTask } from './process';
export default series(
  withTask('clear', () => run('pnpm run clear')),
  buildBundle,
  copyFiles,
  withTask('clear', () => run('pnpm run link'))
);
