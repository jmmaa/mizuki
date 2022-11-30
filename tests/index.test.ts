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

  set((index) => {
    return index + 1;
  });

  expect(get()).toEqual(1);

  set((index) => {
    return index + 69;
  });

  set((index) => {
    return index + 100;
  });

  set((index) => {
    return index + 100;
  });

  set(() => {
    return 7;
  });

  expect(get()).toEqual(7);
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
