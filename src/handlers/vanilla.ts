import { createThrottleRef, createIndexRef } from "../api";

type VanillaOptions = {
  init?: number;
  delay?: number;
  bounds?: {
    min: number;
    max: number;
  };
  loop?: boolean;
};

type DefaultVanillaOptions = {
  init: number;
  delay: number;
  bounds?: {
    min: number;
    max: number;
  };
  loop: boolean;
};

const defaultOpts: DefaultVanillaOptions = {
  init: 0,
  delay: 0,
  bounds: undefined,
  loop: false,
};

export const vanilla = (options?: VanillaOptions) => {
  const _options = options ? { ...defaultOpts, ...options } : defaultOpts;
  const { init, delay, bounds, loop } = _options;

  const index = createIndexRef(init);
  const throttle = createThrottleRef();

  const _set = (setter: number | ((index: number) => number)) => {
    let newIndex: number;

    if (typeof setter === "number") {
      newIndex = setter;
    } else {
      newIndex = setter(index.get());
    }

    if (throttle.isThrottling()) return;

    if (bounds !== undefined) {
      const { min, max } = bounds;

      if (min <= newIndex && max >= newIndex) {
        index.set(newIndex);
        throttle.start(delay);
      } else if (loop && newIndex < min) {
        const overflow = (Math.abs(newIndex) % max) - 1;
        index.set(max - overflow);

        throttle.start(delay);
      } else if (loop && newIndex > max) {
        const overflow = (Math.abs(newIndex) % max) - 1;

        index.set(min + overflow);
        throttle.start(delay);
      }
    } else {
      index.set(newIndex);
      throttle.start(delay);
    }
  };

  const _get = () => index.get();

  return {
    set: _set,
    get: _get,
  };
};
