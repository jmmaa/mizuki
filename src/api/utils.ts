import { createObserver, createState, NotifyFunc, SetStateAction, SubscribeFunc } from "./core";

export const createAnimation = () => {
  const [animationUnits, setAnimationUnits] = createState(0);

  return (options: { units: number; duration: number }, callback: (units: number) => void) => {
    const { units, duration } = options;
    let start = performance.now();

    const rAF = requestAnimationFrame;
    const animate = () => {
      let now = performance.now();
      const delta = Math.min((now - start) / duration, 1);

      const lastAnimationUnits = animationUnits() + delta * units;

      callback(lastAnimationUnits);

      if (delta < 1) {
        rAF(animate);
      } else {
        setAnimationUnits(() => lastAnimationUnits);
      }
    };

    rAF(animate);
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

export const calculate = (newIndex: number, max: number | undefined, min: number | undefined, loop: boolean) => {
  if (min !== undefined && newIndex < min) {
    if (loop && max !== undefined) {
      return max;
    } else {
      return min;
    }
  } else if (max !== undefined && newIndex > max) {
    if (loop && min !== undefined) {
      return min;
    } else {
      return max;
    }
  } else {
    return newIndex;
  }
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

export type IndexTrackerOptions = {
  min?: number;
  max?: number;
  loop?: boolean;
  init?: number;
};

export const createIndexTracker = (options?: IndexTrackerOptions) => {
  const { min, max, loop, init } = {
    min: undefined,
    max: undefined,
    loop: false,
    init: 0,

    ...options,
  };

  const [index, setIndex] = createState(init);

  const allowedToGo = (setter: SetStateAction<number>) => {
    const oldIndex = index();
    const newIndex = calculate(setter(oldIndex), max, min, loop);

    if (newIndex === oldIndex) return false;

    setIndex(() => newIndex);

    return true;
  };

  return [allowedToGo];
};
