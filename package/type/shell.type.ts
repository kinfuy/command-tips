export interface BaseCmd {
  version?: boolean;
  list?: boolean;
}
export interface SearchCmd {
  tag?: string;
  similar?: string;
  regular?: string;
}

export interface InstallCmd {
  name?: string;
  store?: string;
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
