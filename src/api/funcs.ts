import { indexGreaterThanMaxConfig, indexLesserThanMinConfig, isDefined } from "./operators";
import { createTimeout } from "./utils";

export const createAction = (options?: Options) => {
  const { timeout, isTimedOut } = createTimeout();
  const { max, min, delay, loop } = {
    delay: 0,
    loop: false,
    min: undefined,
    max: undefined,
    ...options,
  };

  const lesserThanMin = indexLesserThanMinConfig(min);
  const greaterThanMax = indexGreaterThanMaxConfig(max);
  const loopingToMax = loop && isDefined(max);
  const loopingToMin = loop && isDefined(min);

  return (index: number) => {
    if (isTimedOut()) return;

    if (lesserThanMin(index)) {
      if (loopingToMax) {
        timeout(delay);
        return max;
      }
    } else if (greaterThanMax(index)) {
      if (loopingToMin) {
        timeout(delay);
        return min;
      }
    } else {
      timeout(delay);
      return index;
    }
  };
};
