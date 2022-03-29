export interface BaseCmd {
  version?: boolean;
  list?: boolean;
}
export interface SearchCmd {
  tag?: string;
  similar?: string;
}

export interface InstallCmd {
  name?: string;
  store?: string;
  author?: string;
}

export interface AddCmd {
  file?: string;
  shell?: string;
  change?: boolean | boolean;
}
export interface ShellInfo {
  cli: string;
  desc: string;
  isTemp?: boolean; // true：允许修改shell
}
export interface ShellCliJson {
  name: string;
  shell: ShellInfo[];
}
