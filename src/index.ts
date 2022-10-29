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

const defaultOptions: DefaultMizukiOptions = {
  init: 0,
  delay: 0,
  bounds: undefined,
  loop: false,
};

export const mizuki = (options?: MizukiOptions) => {
  const __options = options
    ? { ...defaultOptions, ...options }
    : defaultOptions;

  const { init, delay, bounds, loop } = __options;

  let index: number = init;
  let timeout: any | null = null;

  const startTimeout = () => {
    // check for true non-delay
    if (delay > 0) {
      timeout = setTimeout(() => {
        timeout = null;
      }, delay);
    }
  };
  return {
    get: () => index,
    set: (cb: (index: number) => number) => {
      let newIndex = cb(index);

      if (timeout === null) {
        if (bounds !== undefined) {
          const { min, max } = bounds;

          if (min <= newIndex && max >= newIndex) {
            index = newIndex;
            startTimeout();
          }

          if (newIndex < min) {
            if (loop) {
              index = max;
              startTimeout();
            }
          }

          if (newIndex > max) {
            if (loop) {
              index = min;
              startTimeout();
            }
          }
        } else {
          index = newIndex;
          startTimeout();
        }
      }
    },
  };
};

export default mizuki;
