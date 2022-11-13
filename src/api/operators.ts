export const lesser = (a: number, b: number) => a < b;
export const greater = (a: number, b: number) => a > b;
export const wrapDefault = <T, F>(t: T, f: F) => (t !== undefined ? t : f);
export const and = (...args: boolean[]) => args.reduceRight((prev, curr) => prev && curr);
