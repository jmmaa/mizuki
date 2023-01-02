export type StateGetter<T> = () => T;
export type StateSetter<T> = (value: T) => void;

const context: (() => void)[] = [];
const getCurrentObserver = () => context[context.length - 1];

export const createSignal = <T>(state: T): [StateGetter<T>, StateSetter<T>] => {
  const subscribers = new Set<() => void>();

  const read = () => {
    const curr = getCurrentObserver();
    if (curr) subscribers.add(curr);

    return state;
  };

  const write = (newValue: T) => {
    state = newValue;

    for (const sub of subscribers) sub();
  };

  return [read, write];
};

export const createEffect = (callback: () => void) => {
  const execute = () => {
    context.push(execute);

    try {
      callback();
    } finally {
      context.pop();
    }
  };
  execute();
};

export type TimeoutFunc = (delay: number) => void;
export type IsTimedOutFunc = () => boolean;

export const createTimeout = (): [TimeoutFunc, IsTimedOutFunc] => {
  let timeoutState: any = null;

  const timeout = (delay: number) => {
    if (delay > 0) {
      timeoutState = setTimeout(() => {
        timeoutState = null;
      }, delay);
    }
  };

  const isTimedOut = () => (timeoutState !== null ? true : false);

  return [timeout, isTimedOut];
};
