export interface SearchCmd {
  tag?: string;
  similar?: string;
  regular?: string;
}
export interface ShellInfo {
  cli: string;
  desc: string;
}
export interface ShellCliJson {
  name: string;
  shell: ShellInfo[];
}
