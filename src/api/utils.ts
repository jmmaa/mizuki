import {
  createObserver,
  createState,
  NotifyFunc,
  SetStateAction,
  SubscribeFunc,
  calculate,
  StateGetterFunc,
  StateSetterFunc,
} from "./core";

import { timedelta } from "./funcs";

export type FrameCallback = (delta: number) => (() => void) | undefined;
export type AnimationOptions = {
  duration: number;
};

export const createAnimation = (options: AnimationOptions, callback: FrameCallback) => {
  const rAF = requestAnimationFrame;

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

export const createEventObserver = <T>(el: Element | null, type: string): SubscribeFunc<T> => {
  const [notify, sub] = createObserver<T>();

  const handler = (event: Event) => {
    notify(<T>event);
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
    let unsub = sub(callback);

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
  const [get, set] = createState<NodeJS.Timeout | null>(null);

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

export type ControllerOptions = {
  min?: number;
  max?: number;
  loop?: boolean;
  init?: number;
};

export type ValidatorFunc<T> = (setter: SetStateAction<T>) => boolean;

export const createController = (
  options?: ControllerOptions
): [StateGetterFunc<number>, StateSetterFunc<number>, ValidatorFunc<number>] => {
  const { min, max, loop, init } = {
    min: undefined,
    max: undefined,
    loop: false,
    init: 0,

    ...options,
  };

  const [getIndex, setIndex] = createState(init);

  const validate = (setter: SetStateAction<number>) => {
    const oldIndex = getIndex();
    const newIndex = calculate(setter(oldIndex), max, min, loop);

    if (newIndex === oldIndex) return false;
    return true;
  };

  return [getIndex, setIndex, validate];
};
