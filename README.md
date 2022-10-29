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

```js
import "./style.css";
import mizuki from "mizuki";

// config
const { get, set } = mizuki({ delay: 1000, min: 0, max: 3 });

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

### With React (there will be a hook for this in the future)

```tsx
import mizuki from "mizuki";
import React from "react";

export default function Scroller() {
  const [index, setIndex] = React.useState(0);

  const { get, set } = React.useMemo(
    // needs useMemo to avoid cleanup on index
    () =>
      mizuki({
        delay: 1000,
        bounds: {
          min: 0,
          max: 3,
        },
        init: 0,
        loop: false,
      }),
    []
  );

  const offsets = [0, -100, -200, -300];

  const wheelHandler = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0) {
      set((idx) => idx + 1);
      setIndex(get()); // needs setState to trigger a rerender
    } else if (e.deltaY < 0) {
      set((idx) => idx - 1);
      setIndex(get());
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", overflowY: "hidden" }}>
      <div
        onWheel={wheelHandler}
        style={{
          transform: `translateY(${offsets[index]}vh)`,
          transitionDuration: "1s",
          transition: "all 1s ease",
        }}
      >
        <div style={{ width: "100vw", height: "100vh", background: "#ff5f45" }}>
          Kanade
        </div>
        <div style={{ width: "100vw", height: "100vh", background: "#0798ec" }}>
          Mafuyu
        </div>
        <div style={{ width: "100vw", height: "100vh", background: "#fc6c7c" }}>
          Ena
        </div>
        <div style={{ width: "100vw", height: "100vh", background: "#fec401" }}>
          Mizuki
        </div>
      </div>
    </div>
  );
}

export default App;
```
