# Mizuki

A javascript library for building your own paginated component

### yarn

```
yarn add mizuki
```

### npm

```
npm install mizuki
```

# What?

**Mizuki** is a javascript library that helps you create behaviors for your custom paginated components. It uses variety of functions and handlers to help you build your own custom pagination behavior.

##### Features

- Simple and minimalistic API
- No dependencies
- tiny, (1.2kb, esbuild)

# Why?

If you want it to be less painful to implement your own scroller, fullpage, swiper or what not.

# How to Use

Mizuki exports variety of functions to help you build your own paginated component's engine. Here below is a helper function for creating the index of your pagination which you can set/get the index state.

```ts
// index
const index = mizuki.createIndexRef(0);

index.get(); // 0 (default)
index.set((i) => i + 5); // 5
```

Best way is to use a `handler`, which are some pre-built functions that are composed with `mizuki API`. Here is an example using the built-in `vanilla` handler

```ts
import { vanilla } from "mizuki";

const { get, set } = vanilla({
  bounds: { min: 0, max: 3 },
  loop: true,
  init: 1,
});

get(); // 1 (initial index)

set(3);
get(); // 3

set(0);
get(); // 0

set((i) => i - 1);
get(); // 3 (since loop is set to true, it sets 3 instead)
```

# Examples

Examples are in [here](https://github.com/jmmaa/mizuki/tree/main/examples)

#### Whats with the name?

nightcord mizuki pog \
<img src='https://static.wikia.nocookie.net/projectsekai/images/8/8d/Akiyama_Mizuki_school_chibi.png' width="125px"/>
