# Mizuki

A javascript library for helping you build your own pagination

### yarn

```
yarn add mizuki
```

### npm

```
npm install mizuki
```

# What?

**Mizuki** is a javascript library for helping you build your own pagination. It uses variety of utility functions to help you build your own custom pagination behavior.

##### Features

- Simple and minimalistic API
- No dependencies

# Why?

If you want it to be less painful to implement your own scroller, fullpage, swiper or what not.

# How to Use

```ts
const animate = mizuki.createAnimation();
const onWheel = mizuki.createEventObserver(scroller, "wheel");
const [timeout, isTimedout] = mizuki.createTimeout();
const [allowedToGo] = mizuki.createIndexTracker({ max: 3, min: 0, loop: false });

const wheelHandler = (event) => {
  if (isTimedout()) return; // throttle if timeout still persists

  if (event.deltaY > 0) {
    if (allowedToGo((index) => index + 1)) {
      // check if allowed to go to the next slide

      animate(
        { units: -100, duration: 1000 },
        (units) => {
          // apply style changes here every frame
          scrollerContent.style.transform = `translate3d(0, ${units}vh, 0)`;
        },
        1000
      );

      timeout(1000); // timeout for 1 seconds after changing slide
    }
  } else if (event.deltaY < 0) {
    if (allowedToGo((index) => index - 1)) {
      animate(
        { units: 100, duration: 1000 },
        (units) => {
          scrollerContent.style.transform = `translate3d(0, ${units}vh, 0)`;
        },
        1000
      );

      timeout(1000);
    }
  }
};

onWheel(wheelHandler);
```

TODO

# Examples

More examples in [here](https://github.com/jmmaa/mizuki/tree/main/examples)
