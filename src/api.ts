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

export const createThrottleRef = () => {
  let timeout: any = null;

  const _start = (delay: number) => {
    if (delay > 0) {
      timeout = setTimeout(() => {
        _stop();
      }, delay);
    }
  };

  const _stop = () => {
    timeout = null;
  };

  const _isThrottling = () => {
    return timeout !== null ? true : false;
  };

  return {
    isThrottling: _isThrottling,
    start: _start,
    stop: _stop,
  };
};
