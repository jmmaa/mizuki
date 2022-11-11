export const createTimeout = () => {
  let timeout: any = null;

  const _persist = (delay: number) => {
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

  const _persists = () => (timeout !== null ? true : false);

  return {
    persists: _persists,
    persist: _persist,
    stop: _stop,
  };
};

export const createAnimationFrames = (callback: (delta: number) => void, duration: number) => {
  let start = new Date();
  let raf = requestAnimationFrame;
  let caf = cancelAnimationFrame;
  let req: any = null;

  const animate = () => {
    let now = new Date();

    const delta = Math.min((now.getTime() - start.getTime()) / duration, 1);

    callback(delta);

    caf(req); // to prevent layout shift
    if (delta < 1) {
      req = raf(animate);
    }
  };
  raf(animate);
};
