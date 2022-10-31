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

const mizuki = () => {
  let index: number;

  return (options?: MizukiOptions) => {
    const _options = options ? { ...defaultOpts, ...options } : defaultOpts;

    const { init, delay, bounds, loop } = _options;

    let timeout: any = null;

    index = index | init;

    const _timeout = () => {
      if (delay > 0) {
        timeout = setTimeout(() => {
          timeout = null;
        }, delay);
      }
    };

    const _set = (setter: number | ((index: number) => number)) => {
      let newIndex: number;

      if (typeof setter === "number") {
        newIndex = setter;
      } else {
        newIndex = setter(index);
      }

      if (timeout === null) {
        if (bounds !== undefined) {
          const { min, max } = bounds;

          if (min <= newIndex && max >= newIndex) {
            index = newIndex;
            _timeout();
          }

          if (newIndex < min) {
            if (loop) {
              index = max;
              _timeout();
            }
          }

          if (newIndex > max) {
            if (loop) {
              index = min;
              _timeout();
            }
          }
        } else {
          index = newIndex;
          _timeout();
        }
      }
    };

    const _get = () => index;

    return {
      get: _get,
      set: _set,
    };
  };
};

export default mizuki;
