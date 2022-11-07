import { createIndexRef, createIntervalRef, createTimeoutRef } from "../src";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

test("basic set/get operation", () => {
  const { get, set } = createIndexRef(0);

  expect(get()).toEqual(0);

  set(15);
  expect(get()).toEqual(15);

  set(20);
  expect(get()).toEqual(20);

  set(30);
  expect(get()).toEqual(30);

  set(11 / 2);
  expect(get()).toEqual(11 / 2);
});

test("basic interval operation", async () => {
  const { get, set } = createIndexRef(0);

  const interval = createIntervalRef();

  interval.subscribe(() => {
    set(get() + 1);

    if (get() === 3) {
      interval.stop();
    }
  });

  interval.start(500);

  await sleep(2000);

  expect(get()).toEqual(3);

  interval.stop();
});

test("basic timeout operation", async () => {
  const timeout = createTimeoutRef();
  const { get, set } = createIndexRef(0);

  const changeValue = (i: number) => {
    if (timeout.persists()) return;
    set(i);
    timeout.start(1000);
  };

  changeValue(20);

  expect(get()).toEqual(20);

  changeValue(69);

  expect(get()).toEqual(20);

  await sleep(1000);

  changeValue(69);

  expect(get()).toEqual(69);

  timeout.stop();
});
