const delta = (initial: number, final: number) => final - initial;
const timedelta = (initial: number, final: number, time: number) =>
  delta(initial, final) / time;

export const animate = (
  duration: number,
  callback: (delta: number) => void
) => {
  const raf = requestAnimationFrame;

  const _animate = (initial: number, final: number) => {
    const delta = Math.min(timedelta(initial, final, duration), 1);

    callback(delta);

    if (delta < 1) {
      raf((timestamp: number) => _animate(initial, timestamp));
    }
  };

  raf((initial: number) => {
    raf((timestamp: number) => _animate(initial, timestamp));
  });
};
