declare module 'pandas-js' {
  export class DataFrame {
    constructor(data: any[]);
    length: number;
    get(column: string, index: number): any;
  }
} 