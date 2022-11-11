import { define, lesserThan, greaterThan } from "./funcs";
import { createTimeout } from "./utils";

export const action = (options?: {
  min?: number;
  max?: number;
  loop?: boolean;
  delay?: number;
}) => {
  const ratelimit = createTimeout();
  const opts = define(options, { delay: 0, loop: false, min: undefined, max: undefined });
  const delay = define(opts.delay, 0);
  const loop = define(opts.loop, false);
  const min = define(opts.min, undefined);
  const max = define(opts.max, undefined);

  const lesserThanMin = min !== undefined ? lesserThan(min) : (_: any) => false;
  const greaterThanMax = max !== undefined ? greaterThan(max) : (_: any) => false;

  return (index: number) => {
    if (ratelimit.persists()) return;

    if (lesserThanMin(index)) {
      if (loop && max !== undefined) {
        ratelimit.persist(delay);
        return max;
      }
    } else if (greaterThanMax(index)) {
      if (loop && min !== undefined) {
        ratelimit.persist(delay);
        return min;
      }
    } else {
      ratelimit.persist(delay);
      return index;
    }
  };
};
