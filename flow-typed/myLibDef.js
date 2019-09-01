declare module "lodash" {
  declare export function chunk(varA: Array<any>, varB: number): Array<any>;
}

declare module "electron-json-storage" {
  declare class storage {
    constructor(): Function;
    static get(
      key: string,
      callback: (error: any, data: {}) => void | Promise<any>
    ): void;
    static set(key: string, json: {}, callback: (error: any) => void): void;
  }

  declare export default typeof storage;
}
