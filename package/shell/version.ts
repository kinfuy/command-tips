import { promisify } from 'util';
import pkg from '../../package.json';
import { green, red } from 'chalk';
const figlet = promisify(require('figlet'));

const log = (type: string, msg: string) => {
  if (type === 'success') {
    console.log(green(msg));
  }
  if (type === 'error') {
    console.log(red(msg));
  }
};
export const version = async () => {
  const info = await figlet(`${pkg.name}`);
  log('success', `${info}  ${pkg.version}`);
};
