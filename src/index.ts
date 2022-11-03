type MizukiOptions = {
  init?: number;
  delay?: number;
  bounds?: {
    min: number;
    max: number;
  };
  loop?: boolean;
};

type DefaultMizukiOptions = {
  init: number;
  delay: number;
  bounds?: {
    min: number;
    max: number;
  };
  loop: boolean;
};

const defaultOpts: DefaultMizukiOptions = {
  init: 0,
  delay: 0,
  bounds: undefined,
  loop: false,
};

// for version 1.1.6dev

const IndexState = (init: number) => {
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

const TimeoutState = () => {
  let timeout: any = null;

  const _timeout = (delay: number) => {
    if (delay > 0) {
      timeout = setTimeout(() => {
        timeout = null;
      }, delay);
    }
  };

  return {
    get: () => timeout,
    set: _timeout,
  };
};

const mizuki = (options?: MizukiOptions) => {
  const _options = options ? { ...defaultOpts, ...options } : defaultOpts;
  const { init, delay, bounds, loop } = _options;

  const index = IndexState(init);
  const timeout = TimeoutState();

  const _set = (setter: number | ((index: number) => number)) => {
    let newIndex: number;

    if (typeof setter === "number") {
      newIndex = setter;
    } else {
      newIndex = setter(index.get());
    }

    if (timeout.get() !== null) return;

    if (bounds !== undefined) {
      const { min, max } = bounds;

      if (min <= newIndex && max >= newIndex) {
        index.set(newIndex);
        timeout.set(delay);
      } else if (loop && newIndex < min) {
        index.set(max);
        timeout.set(delay);
      } else if (loop && newIndex > max) {
        index.set(min);
        timeout.set(delay);
      }
    } else {
      index.set(newIndex);
      timeout.set(delay);
    }
  };

  const _get = () => index.get();

  return {
    set: _set,
    get: _get,
  };
};

export default mizuki;
