export const define = <T, F>(value: T | undefined, fallback: F) => {
  return value !== undefined ? value : fallback;
};

export const boolExpr = (expr: boolean) => expr;

export const lesserThan = (compared: number) => {
  return (value: number) => boolExpr(value < compared);
};

export const greaterThan = (compared: number) => {
  return (value: number) => boolExpr(value > compared);
};
