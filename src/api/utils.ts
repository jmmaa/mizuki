import { createObserver, createState, NotifyFunc, SetStateAction, SubscribeFunc } from "./core";

/**
 *
 * Creates an animation handler that uses `window.requestAnimationFrame` for smooth animations
 * its return value is a function that takes a callback that receives `delta` and `units`
 *
 */

export const createAnimation = () => {
  let lastUnits = 0;

  return (callback: (delta: number, units: number) => (() => number) | void, duration: number) => {
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

export const createEventObserver = <T>(el: Element | null, type: string) => {
  const [_notify, _subscribe] = createObserver<T>();

  const handler = (event: Event) => {
    _notify(<T>event);
  };
  if (el !== null) {
    el.addEventListener(type, handler);
  }

  const cleanup = () => {
    if (el !== null) {
      el.removeEventListener(type, handler);
    }
  };

  const subscribe: SubscribeFunc<T> = (callback: NotifyFunc<T>) => {
    let unsub = _subscribe(callback);

    return () => {
      unsub();
      cleanup();
    };
  };

  return subscribe;
};

export type TransitionOptions = {
  min?: number;
  max?: number;
  loop?: boolean;
};

export const createTransitionFunction = (options?: TransitionOptions) => {
  const { max, min, loop } = {
    loop: false,
    min: undefined,
    max: undefined,
    ...options,
  };

  return (index: number, setter: SetStateAction<number>): number => {
    let newIndex = setter(index);

    if (min !== undefined && newIndex < min) {
      if (loop && max !== undefined) {
        return max;
      }
    } else if (max !== undefined && newIndex > max) {
      if (loop && min !== undefined) {
        return min;
      }
    } else {
      return newIndex;
    }
    return index;
  };
};

export type TimeoutFunc = (delay: number) => void;
export type IsTimedOutFunc = () => boolean;

export const createTimeout = (): [TimeoutFunc, IsTimedOutFunc] => {
  let [get, set] = createState<NodeJS.Timeout | null>(null);

  const timeout = (delay: number) => {
    if (delay > 0) {
      set(() =>
        setTimeout(() => {
          set(() => null);
        }, delay)
      );
    }
  };

  const isTimedOut = () => (get() !== null ? true : false);

  return [timeout, isTimedOut];
};
