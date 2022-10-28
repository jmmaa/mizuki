# Mizuki

Mizuki is a tiny javascript library that helps you create your own custom scrollers, carousels, or anything similar. It does not have any dependencies and sizes only at `< 1kb`.

### yarn

```
yarn add mizuki
```

### npm

```
npm install mizuki
```

# How to Use

Mizuki exports a default function that creates another function that references on `index`

```ts
const mzk = mizuki();
```

call the function to create the getter and setter functions

```ts
const [get, set] = mzk();
```

The `get` function returns the current `index` of mizuki

```ts
get(); // 0
```

The `set` function takes in a callback to set the `index` of mizuki

```ts
set((index) => index + 1); // adds 1 to the index
```

A simple flow would be like this

```ts
const [get, set] = mzk();

console.log(get()); // 0

set((index) => index + 5);
console.log(get()); // 5

set((index) => index - 2);
console.log(get()); // 3
```

# Examples

### With vanilla JS

```ts
import mizuki from "mizuki";

// initialize mizuki to create throttle and index context
const mzk = mizuki();

// initialize controls and config to create getters and setters
const [get, set] = mzk({ delay: 500 });

const incrementButton = document.querySelector(".inc");
const decrementButton = document.querySelector(".dec");
const counter = document.querySelector(".counter");

counter.innerHTML = get(); // get the initial index

incrementButton.addEventListener("click", () => {
  set((index) => index + 1); // set the index
  counter.innerHTML = get(); // update the index
});

decrementButton.addEventListener("click", () => {
  set((index) => index - 1);
  counter.innerHTML = get();
});
```

### With React

```tsx
import mizuki from "mizuki";
import React from "react";

// declare mizuki engines
const fastMizuki = mizuki({ delay: 100, max: 3, min: -3, init: 2, loop: true }); // globally
const slowMizuki = mizuki();

// instantiate engines to be used all over the app

function App() {
  const [fastIndex, fastSetIndex] = React.useState<number>(0);
  const [slowIndex, slowSetIndex] = React.useState<number>(0);

  // getters and setters
  const [fastGet, fastSet] = React.useMemo(() => fastMizuki(), []);
  const [slowGet, slowSet] = React.useMemo(
    () =>
      slowMizuki({
        delay: 500,
        min: 0,
        max: 3,
        init: 3,
        loop: true,
      }), // dynamically
    []
  );

  // init
  React.useEffect(() => {
    fastSetIndex(fastGet());
    slowSetIndex(slowGet());
  }, []);

  const fastIncrement = () => {
    fastSet((idx) => idx + 1); // this is non-reactive
    fastSetIndex(fastGet()); // setState to rerender
  };

  const fastDecrement = () => {
    fastSet((idx) => idx - 1);
    fastSetIndex(fastGet());
  };

  const slowIncrement = () => {
    slowSet((idx) => idx + 1);
    slowSetIndex(slowGet());
  };

  const slowDecrement = () => {
    slowSet((idx) => idx - 1);
    slowSetIndex(slowGet());
  };
  return (
    <div className="App">
      <div>
        FAST
        <button onClick={fastIncrement}>+</button>
        <button onClick={fastDecrement}>-</button>
      </div>
      <div>fast counter: {fastIndex}</div>
      <div>
        SLOW
        <button onClick={slowIncrement}>+</button>
        <button onClick={slowDecrement}>-</button>
      </div>
      <div>slow counter: {slowIndex}</div>
    </div>
  );
}

export default App;
```
