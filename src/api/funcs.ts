import { greater, lesser } from "./operators";

export const createTimeout = () => {
  let timeout: any = null;

  const _timeout = (delay: number) => {
    if (delay > 0) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        clearTimeout(timeout);
        timeout = null;
      }, delay);
    }
  };

  const _isTimedOut = () => (timeout !== null ? true : false);

  return {
    isTimedOut: _isTimedOut,
    timeout: _timeout,
  };
};

type Options = {
  min?: number;
  max?: number;
  loop?: boolean;
  delay?: number;
};

export const createAction = (options?: Options) => {
  const { timeout, isTimedOut } = createTimeout();
  const { max, min, delay, loop } = {
    delay: 0,
    loop: false,
    min: undefined,
    max: undefined,
    ...options,
  };

  const minDefined = min !== undefined;
  const maxDefined = max !== undefined;

  const loopingToMax = loop && maxDefined;
  const loopingToMin = loop && minDefined;

  return (index: number) => {
    if (isTimedOut()) return;

    if (minDefined ? greater(min, index) : false) {
      if (loopingToMax) {
        timeout(delay);
        return max;
      }
    } else if (maxDefined ? lesser(max, index) : false) {
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

export const createAnimation = () => {
  let previousTransitionValue = 0;

  return (callback: (delta: number, previous: number) => (() => number) | undefined, duration: number) => {
    let start = performance.now();
    const rAF = requestAnimationFrame;

    const _animate = () => {
      let now = performance.now();
      const delta = Math.min((now - start) / duration, 1);

      // return value will set the transition value after recursion
      let getTransitionValueOnFinish = callback(delta, previousTransitionValue);

      if (delta < 1) {
        // reanimate remaining frames
        rAF(_animate);
      } else {
        // set value for referencing last transition to next transition
        if (getTransitionValueOnFinish === undefined) return;
        previousTransitionValue = getTransitionValueOnFinish();
      }
    };

    rAF(_animate);
  };
};
