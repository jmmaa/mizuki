import { createTimeoutRef, createIndexRef, createIntervalRef } from "../api";

type VanillaOptions = {
  init?: number;
  delay?: number;
  bounds?: {
    min: number;
    max: number;
  };
  loop?: boolean;
};

type DefaultOptions = {
  init: number;
  delay: number;
  bounds?: {
    min: number;
    max: number;
  };
  loop: boolean;
};

const defaultOpts: DefaultOptions = {
  init: 0,
  delay: 0,
  bounds: undefined,
  loop: false,
};

export const vanilla = (options?: VanillaOptions) => {
  const _options = options ? { ...defaultOpts, ...options } : defaultOpts;
  const { init, delay, bounds, loop } = _options;

  const index = createIndexRef(init);
  const indexTimeout = createTimeoutRef();

  const autoplayInterval = createIntervalRef();
  const autoplayTimeout = createTimeoutRef();

  const _set = (setter: number | ((index: number) => number)) => {
    if (indexTimeout.persists()) return;

    let newIndex: number;

    if (typeof setter === "number") {
      newIndex = setter;
    } else {
      newIndex = setter(index.get());
    }

    if (bounds !== undefined) {
      const { min, max } = bounds;

      if (min <= newIndex && max >= newIndex) {
        index.set(newIndex);
        indexTimeout.start(delay);
      } else if (loop) {
        const overflow = (Math.abs(newIndex) % max) - 1;

        if (newIndex < min) {
          index.set(max - overflow);
          indexTimeout.start(delay);
        } else if (newIndex > max) {
          index.set(min + overflow);
          indexTimeout.start(delay);
        }
      }
    } else {
      index.set(newIndex);
      indexTimeout.start(delay);
    }
  };

  const _get = () => index.get();

  return {
    set: _set,
    get: _get,
    autoplay: {
      interval: autoplayInterval,
      timeout: autoplayTimeout,
    },
  };
};
