export const lesser = (a: number, b: number) => a < b;
export const greater = (a: number, b: number) => a > b;
export const wrapDefault = <T, F>(t: T, f: F) => (t !== undefined ? t : f);
export const and = (...args: boolean[]) => args.reduceRight((prev, curr) => prev && curr);

export const not = (v: boolean) => !v;

export const isDefined = <T>(v: T | undefined) => v !== undefined;

export const indexLesserThanMinConfig = (min: number | undefined) => {
  return (index: number) => {
    return min !== undefined ? lesser(index, min) : false;
  };
};

export const indexGreaterThanMaxConfig = (max: number | undefined) => {
  return (index: number) => {
    return max !== undefined ? greater(index, max) : false;
  };
};
