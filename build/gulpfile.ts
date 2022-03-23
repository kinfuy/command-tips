import { series } from 'gulp';
import { copyFiles } from './copyfile';
export default series(copyFiles);
