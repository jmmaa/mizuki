type MizukiOptions = {
  init?: number;
  delay?: number;
  min?: number;
  max?: number;
  loop?: boolean;
};

type DefaultMizukiOptions = {
  init: number;
  delay: number;
  min: number | undefined;
  max: number | undefined;
  loop: boolean;
};

const wraps = <T, R>(value: T | R) => {
  return {
    value: value,
    bind: <N>(callback: (value: N) => N) => wraps(callback(<N>value)),
  };
};

const ensure = <T, R>(value: T, fallback: R) =>
  wraps<T, R>(value).bind<R>((v) => (v ? <R>v : <R>fallback));

const ensureOptions = (options?: MizukiOptions): DefaultMizukiOptions => {
  const __defaultOpts: DefaultMizukiOptions = {
    init: 0,
    delay: 0,
    min: undefined,
    max: undefined,
    loop: false,
  };

  const __options = ensure(options, __defaultOpts).value;

  if (
    !(
      (__options.min === undefined && __options.max === undefined) ||
      (typeof __options.min === "number" && typeof __options.max === "number")
    )
  ) {
    throw new Error(
      "you have to set both 'min' and 'max' and not just one of them!"
    );
  }

  return {
    ...__defaultOpts,
    ...__options,
  };
};

const mizuki = (options?: MizukiOptions) => {
  const globalOptions = ensureOptions(options);

  let pause: boolean = false;
  let index: number = globalOptions.init;

  return (
    options?: MizukiOptions
  ): [get: () => number, set: (cb: (index: number) => number) => void] => {
    const { init, delay, min, max, loop } = options
      ? { ...globalOptions, ...options }
      : globalOptions;

    index = init;

    const get = () => {
      return index;
    };

    const set = (cb: (index: number) => number) => {
      if (pause) return;

      pause = true;

      let newIndex = cb(index);

      if (min !== undefined && max !== undefined) {
        if (min <= newIndex && max >= newIndex) {
          index = newIndex;
        } else if (min > newIndex) {
          if (loop) {
            index = max;
          }
        } else if (max < newIndex) {
          if (loop) {
            index = min;
          }
        }
      } else {
        index = newIndex;
      }

      setTimeout(() => {
        pause = false;
      }, delay);
    };

    return [get, set];
  };
};

export default mizuki;
