export const createIndexRef = (init: number) => {
  let index: number = init;

  const _set = (value: number) => {
    index = value;
  };

  const _get = () => index;

  return {
    get: _get,
    set: _set,
  };
};

export const createTimeoutRef = () => {
  let timeout: any = null;

  const _start = (delay: number) => {
    if (delay > 0) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        _stop();
      }, delay);
    }
  };

  const _stop = () => {
    clearTimeout(timeout);
    timeout = null;
  };

  const _persists = () => {
    return timeout !== null ? true : false;
  };

  return {
    persists: _persists,
    start: _start,
    stop: _stop,
  };
};

export const createIntervalRef = () => {
  let interval: any;
  let subscribers: (() => void)[] = [];

  const _start = (delay: number) => {
    interval = setInterval(() => {
      for (let sub of subscribers) {
        sub();
      }
    }, delay);
  };

  const _stop = () => {
    clearInterval(interval);
  };

  const _subscribe = (callback: () => void) => {
    subscribers = [...subscribers, callback];
  };

  return {
    start: _start,
    stop: _stop,
    subscribe: _subscribe,
  };
};
//
