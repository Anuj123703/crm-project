declare module "json2csv" {
    export class Parser<T = unknown> {
        constructor(opts?: unknown);
        parse(data: T[]): string;
    }
}