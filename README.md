# Mizuki

A javascript library to make your own pagination

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

- React-like API
- supports `requestAnimationFrame` as a utility
- No dependencies

# Why?

If you want it to be less painful to implement your own scroller, fullpage, swiper or what not.

# How to Use

TODO

# Examples

![alt text](https://i.ibb.co/MCknBjL/mizuki-sample.gif)

```ts
import mizuki from "mizuki";
import bezier from "bezier-easing";

const ease = bezier(0.25, 0.1, 0.25, 1.0); // ease timing function
const scroller = document.querySelector(".scroller");
const scrollerContent = document.querySelector(".scroller-content")

const [allowedToGo] = mizuki.createTracker({ max: 3, min: 0, loop: false });
const [timeout, isTimedout] = mizuki.createTimeout();
const [getLastUnits, setLastUnits] = mizuki.createState(0);

const wheelHandler = (event) => {
  if (isTimedout()) return; // throttle if timeout still persists

  if (event.deltaY < 0) { // go 
    
    if (allowedToGo((index) => index - 1)) { // check if allowed to go to the next slide

      mizuki.createAnimation({ duration: 1000 }, (delta) => {

        const transformValue = getLastUnits() + ease(delta) * 100;
        scrollerContent.style.transform = `translate3d(0, ${transformValue}vh, 0)`;

        return () => setLastUnits(() => transformValue); // this will execute after requestAnimationFrame loop
      });


      timeout(1000); // timeout for 1 second after changing slide
    }
  } else if (event.deltaY > 0) {

    if (allowedToGo((index) => index + 1)) {

      mizuki.createAnimation({ duration: 1000 }, (delta) => {

        const transformValue = getLastUnits() + ease(delta) * -100;
        scrollerContent.style.transform = `translate3d(0, ${transformValue}vh, 0)`;

        return () => setLastUnits(() => transformValue);
      });

      timeout(1000);
    }
  }
};

scroller.addEventListener("wheel", wheelHandler);
```

More info of it in [here](https://github.com/jmmaa/mizuki/tree/main/examples)
