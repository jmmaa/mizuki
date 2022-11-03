import mizuki from "../src/index";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

test("get/set functions", () => {
  const { get, set } = mizuki();

  expect(get()).toEqual(0);
  set((index) => index + 1);

  expect(get()).toEqual(1);

  set((index) => index - 1);
  expect(get()).toEqual(0);

  set(69);
  expect(get()).toEqual(69);
});

test("for using delay", async () => {
  const { get, set } = mizuki({ delay: 1000 });

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
  const { get, set } = mizuki({ bounds: { min: 0, max: 3 } });

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
  const { get, set } = mizuki({ bounds: { min: 0, max: 3 }, loop: true });

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

test("without destructuring mizuki", () => {
  const myEngine = mizuki({ bounds: { min: 0, max: 3 }, loop: true });
  expect(myEngine.get()).toEqual(0);

  myEngine.set((index) => index + 1);
  myEngine.set((index) => index + 1);
  myEngine.set((index) => index + 1);

  expect(myEngine.get()).toEqual(3);

  myEngine.set((index) => index + 1);

  expect(myEngine.get()).toEqual(0);

  myEngine.set((index) => index - 1);

  expect(myEngine.get()).toEqual(3);
});

test("benchmark set/get calls", () => {
  let start = performance.now();

  const { get, set } = mizuki({ bounds: { min: 0, max: 3 }, loop: true });
  const count = 100_000_000;

  for (let i = 0; i < count; i++) {
    set((index) => index + 1);
    get();
  }

  let end = performance.now();

  console.log(`time it took for ${count} set and get calls: ${end - start}ms`);
});
