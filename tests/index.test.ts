import mizuki from "../src/index";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

test("get/set functions", () => {
  const { get, set } = mizuki.vanilla();

  expect(get()).toEqual(0);
  set((index) => index + 1);

  expect(get()).toEqual(1);

  set((index) => index - 1);
  expect(get()).toEqual(0);

  set(69);
  expect(get()).toEqual(69);
});

test("for using delay", async () => {
  const { get, set } = mizuki.vanilla({ delay: 1000 });

  expect(get()).toEqual(0);
  set((index) => index + 1);

  expect(get()).toEqual(1);
  set((index) => index - 1);
  expect(get()).toEqual(1);

  await sleep(1100);
  set((index) => index - 1);

  expect(get()).toEqual(0);
});

test("for using bounds", () => {
  const { get, set } = mizuki.vanilla({ bounds: { min: 0, max: 3 } });

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
  const { get, set } = mizuki.vanilla({
    bounds: { min: 0, max: 3 },
    loop: true,
  });

  expect(get()).toEqual(0);

  set((index) => index + 1);
  set((index) => index + 1);
  set((index) => index + 1);

  expect(get()).toEqual(3);

  set((index) => index + 1);

  expect(get()).toEqual(0);

  set((index) => index - 1);

  expect(get()).toEqual(3);

  set(5);
  expect(get()).toEqual(1);

  set((index) => index - 3);
  expect(get()).toEqual(2);
});

test("without destructuring mizuki", () => {
  const myEngine = mizuki.vanilla({ bounds: { min: 0, max: 3 }, loop: true });
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
  const { get, set } = mizuki.vanilla({
    bounds: { min: 0, max: 3 },
    loop: true,
  });
  const count = 10_000_000;

  let setCallsTimeTotal = 0;
  let getCallsTimeTotal = 0;

  for (let i = 0; i < count; i++) {
    let setStart = performance.now();
    set((index) => index * Math.random());
    let setEnd = performance.now();
    let setRes = setEnd - setStart;

    setCallsTimeTotal += setRes;
  }

  for (let i = 0; i < count; i++) {
    let getStart = performance.now();
    get();
    let getEnd = performance.now();
    let getRes = getEnd - getStart;
    getCallsTimeTotal += getRes;
  }

  console.log(`time it took for ${count} set calls: ${setCallsTimeTotal}ms`);

  console.log(`time it took for ${count} get calls: ${getCallsTimeTotal}ms`);
});

test("benchmark set/get calls using loop ", () => {
  const { get, set } = mizuki.vanilla({
    bounds: { min: 0, max: 3 },
    loop: true,
  });
  const count = 10_000_000;

  let setCallsTimeTotal = 0;
  let getCallsTimeTotal = 0;

  for (let i = 0; i < count; i++) {
    let setStart = performance.now();
    set((index) => index + 5);
    let setEnd = performance.now();
    let setRes = setEnd - setStart;

    setCallsTimeTotal += setRes;
  }

  for (let i = 0; i < count; i++) {
    let getStart = performance.now();
    get();
    let getEnd = performance.now();
    let getRes = getEnd - getStart;
    getCallsTimeTotal += getRes;
  }

  console.log(`time it took for ${count} set calls: ${setCallsTimeTotal}ms`);

  console.log(`time it took for ${count} get calls: ${getCallsTimeTotal}ms`);
});
