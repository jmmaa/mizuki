import mizuki from "../src";

test("calculate index", () => {
  let index: number = 0;

  index = mizuki.calculate(index + 1, 3, 0, true);
  expect(index).toEqual(1);

  index = mizuki.calculate(index + 2, 3, 0, true);
  expect(index).toEqual(3);

  index = mizuki.calculate(index + 1, 3, 0, true);
  expect(index).toEqual(0);

  index = mizuki.calculate(index - 1, 3, 0, true);
  expect(index).toEqual(3);

  index = mizuki.calculate(index - 2, 3, 0, true);
  expect(index).toEqual(1);
});

test("createState", () => {
  const [get, set] = mizuki.createState(0);

  expect(get()).toEqual(0);

  set((index) => index + 1);

  expect(get()).toEqual(1);

  set((index) => index + 69);

  set((index) => index + 100);

  set((index) => index + 100);

  set(() => 7);

  expect(get()).toEqual(7);

  for (let i = 0; i < 50; i++) {
    set((index) => index + 1);
  }

  expect(get()).toEqual(57);
});

test("createObserver", () => {
  const [notify, subscribe] = mizuki.createObserver<number>();
  let curr = 0;
  subscribe((value) => {
    expect(value).toEqual(curr);
  });

  notify(curr);
  curr += 1;

  notify(curr);

  curr -= 1;
  notify(curr);
});

test("benchmark calculate", () => {
  const count = 100_000_000;

  const benchmark = (iterations: number) => {
    let total = 0;

    for (let j = 0; j < iterations; j++) {
      const start = performance.now();

      let index = 0;
      for (let i = 0; i < count; i++) {
        index = mizuki.calculate(index, 3, 0, true);
      }

      const end = performance.now();

      total += end - start;
    }

    return total / iterations;
  };

  console.log(`time it took to perform 1m calc calls: ${Math.round(benchmark(1000))}ms`);
});

test("benchmark createState", () => {
  const [get, set] = mizuki.createState(0);
  const count = 100_000_000;

  const benchmark = (iterations: number) => {
    let total = 0;
    let index = 0;

    for (let j = 0; j < iterations; j++) {
      const start = performance.now();

      for (let i = 0; i < count; i++) {
        set((i) => i + 1);
        index = get();
      }

      const end = performance.now();

      total += end - start;
    }

    return total / iterations;
  };

  console.log(`time it took to perform 1m calc calls: ${Math.round(benchmark(1))}ms`);
});

test("benchmark createController", () => {
  const [get, set, valid] = mizuki.createController({ min: 0, max: 3, loop: true });
  const count = 100_000_000;

  const benchmark = (iterations: number) => {
    let total = 0;
    let index = 0;

    for (let j = 0; j < iterations; j++) {
      const start = performance.now();

      for (let i = 0; i < count; i++) {
        if (valid((i) => i + 1)) {
          set((i) => i + 1);
          index = get();
        }
      }

      const end = performance.now();

      total += end - start;
    }
    console.log(index);

    return total / iterations;
  };

  console.log(`time it took to perform 1m calc calls: ${Math.round(benchmark(1))}ms`);
});
