export const delta = (initial: number, final: number) => final - initial;
export const timedelta = (initial: number, final: number, time: number) =>
  delta(initial, final) / time;
