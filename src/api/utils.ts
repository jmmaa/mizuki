/**
 *
 * Creates a timeout handler that can be referenced in the whole application
 * or use them together for flexible timeout behavior
 *
 */
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

/**
 *
 * Creates an animation handler that uses `window.requestAnimationFrame` for smooth animations
 * its return value is a function that takes a callback that receives `delta` and `units`
 *
 */

export const createAnimation = () => {
  let lastUnits = 0;

  return (callback: (delta: number, units: number) => (() => number) | undefined, duration: number) => {
    let start = performance.now();
    const rAF = requestAnimationFrame;

    const animate = () => {
      let now = performance.now();
      const delta = Math.min((now - start) / duration, 1);

      // return value will set the transition value after recursion
      let getLastUnitsOnFinish = callback(delta, lastUnits);

      if (delta < 1) {
        // reanimate remaining frames
        rAF(animate);
      } else {
        // set value for referencing last transition to next transition
        if (getLastUnitsOnFinish === undefined) return;
        lastUnits = getLastUnitsOnFinish();
      }
    };

    rAF(animate); // find a frame-ready time to start animation
  };
};
