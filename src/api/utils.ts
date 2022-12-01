import { createObserver, createState, NotifyFunc, SetStateAction, SubscribeFunc, calculate } from "./core";

export const delta = (initial: number, final: number) => final - initial;
export const timedelta = (initial: number, final: number, time: number) => delta(initial, final) / time;
export const rAF = requestAnimationFrame;

export const createAnimation = (
  options: { duration: number },
  callback: (delta: number) => (() => void) | undefined
) => {
  const { duration } = options;
  const animate = (initial: number, final: number) => {
    const delta = Math.min(timedelta(initial, final, duration), 1);
    const finished = callback(delta);

    if (delta < 1) {
      rAF((ts: number) => animate(initial, ts));
    } else {
      if (finished !== undefined) finished();
    }
  };

  rAF((initial: number) => {
    rAF((ts: number) => animate(initial, ts));
  });
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

export type TrackerOptions = {
  min?: number;
  max?: number;
  loop?: boolean;
  init?: number;
};

export const createTracker = (options?: TrackerOptions) => {
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
