import mizuki from "../src/index";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

test("get/set functions", () => {
  const engine = mizuki();
  const { get, set } = engine();

  expect(get()).toEqual(0);
  set((index) => index + 1);

  expect(get()).toEqual(1);

  set((index) => index - 1);
  expect(get()).toEqual(0);

  set(69);
  expect(get()).toEqual(69);
});

test("for using delay", async () => {
  const engine = mizuki();
  const { get, set } = engine({ delay: 1000 });

  expect(get()).toEqual(0);
  set((index) => index + 1);

  expect(get()).toEqual(1);
  set((index) => index - 1);
  expect(get()).toEqual(1);

  await sleep(1000);
  set((index) => index - 1);

  expect(get()).toEqual(0);
});

test("for using bounds", () => {
  const engine = mizuki();
  const { get, set } = engine({ bounds: { min: 0, max: 3 } });

  expect(get()).toEqual(0);

  set((index) => index + 1);
  set((index) => index + 1);
  set((index) => index + 1);

  expect(get()).toEqual(3);

  set((index) => index + 1);

  expect(get()).toEqual(3);

  set((index) => index - 1);
  set((index) => index - 1);
  set((index) => index - 1);

  expect(get()).toEqual(0);

  set((index) => index - 1);

  expect(get()).toEqual(0);
});

test("for using loop", () => {
  const engine = mizuki();
  const { get, set } = engine({ bounds: { min: 0, max: 3 }, loop: true });

  expect(get()).toEqual(0);

  set((index) => index + 1);
  set((index) => index + 1);
  set((index) => index + 1);

  expect(get()).toEqual(3);

  set((index) => index + 1);

  expect(get()).toEqual(0);

  set((index) => index - 1);

  expect(get()).toEqual(3);
});

test("benchmark", () => {
  const engine = mizuki();

  let start = performance.now();
  const { set } = engine({ bounds: { min: 0, max: 3 }, loop: true });
  const count = 100_000_000;

  for (let i = 0; i < count; i++) {
    set((index) => index + 1);
  }

  let end = performance.now();

  console.log(`time it took for ${count} set calls: ${end - start}ms`);
});
