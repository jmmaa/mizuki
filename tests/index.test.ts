import mizuki from "../src/index";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

test("for config", () => {
  mizuki();
  mizuki({});
  mizuki({ delay: 1000, bounds: { min: 0, max: 3 }, loop: true });
});

test("get/set functions", () => {
  const { get, set } = mizuki();

  expect(get()).toEqual(0);
  set((index) => index + 1);

  expect(get()).toEqual(1);

  set((index) => index - 1);
  expect(get()).toEqual(0);
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
