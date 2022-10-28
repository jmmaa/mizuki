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

  let index: number = globalOptions.init;
  let pause: boolean = false;

  let timeout: any | null = null;

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
      const timeoutStart = () => {
        timeout = setTimeout(() => {
          timeout = null;
        }, delay);
      };

      let newIndex = cb(index);

      if (timeout === null) {
        if (min !== undefined && max !== undefined) {
          if (min <= newIndex && max >= newIndex) {
            index = newIndex;
            timeoutStart();
          }

          if (newIndex < min) {
            if (loop) {
              index = max;
              timeoutStart();
            }
          }

          if (newIndex > max) {
            if (loop) {
              index = min;
              timeoutStart();
            }
          }
        } else {
          index = newIndex;
          timeoutStart();
        }
      }
    };

    return [get, set];
  };
};

export default mizuki;
