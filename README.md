# Mizuki

A _tiny_ javascript library to help you in adding behavior for your custom carousels, swipers, or anything similar.

### yarn

```
yarn add mizuki
```

### npm

```
npm install mizuki
```

# What?

**Mizuki** is a tiny javascript library that helps you create behaviors for custom scrollers, swipers, or anything similar. It is generic enough that it simply focuses on getting and setting a single value `index`, which you can use as a reference for triggering animations.

##### Features

- Simple and minimalistic API
- No dependencies
- So tiny, (< 500b, esbuild)

# Why?

If you want it to be less painful to implement your own scroller, fullpage, swiper or what not.

# How to Use

Mizuki exports a default function that returns an object consisting of getter and setter functions.

```ts
const { get, set } = mizuki();
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
const config = mizuki();
const { get, set } = config({ ...options });

console.log(get()); // 0 default index

set((index) => index + 5);
console.log(get()); // 5

set((index) => index - 2);
console.log(get()); // 3
```

# Examples

Examples are in [here](https://github.com/jmmaa/mizuki/tree/main/examples)

# Whats with the name?

nightcord mizuki fan pog \
<img src='https://static.wikia.nocookie.net/projectsekai/images/8/8d/Akiyama_Mizuki_school_chibi.png' width="125px"/>
