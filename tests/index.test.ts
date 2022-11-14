import mizuki from "../src";

test("create action func", () => {
  let index = 0;

  const act = mizuki.createAction();

  let act1 = act(index + 1);
  index = act1 !== undefined ? act1 : index;

  expect(index).toEqual(1);

  let act2 = act(index - 1);
  index = act2 !== undefined ? act2 : index;

  expect(index).toEqual(0);
});

test("benchmark create action func", () => {
  const act = mizuki.createAction({ delay: 0, min: 0, loop: true, max: 5 });
  let index = 0;
  const count = 100_000_000;

  const benchmark = (iterations: number) => {
    let total = 0;

    const iteration = () => {
      let start = performance.now();

      for (let i = 0; i < count; i++) {
        let act1 = act(index + 1);
        index = act1 !== undefined ? act1 : index;
      }

      let end = performance.now();

      return end - start;
    };

    for (let j = 0; j < iterations; j++) {
      total += iteration();
    }

    return Math.round(total / iterations);
  };

  console.log(`time it took to ${count} action calls: ${benchmark(10)}ms`);
});
