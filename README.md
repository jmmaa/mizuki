# Mizuki

A javascript library to make your own pagination with full control and flexibility

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

- Solid.js-like API
- framework agnostic
- lightweight and tiny (`1.1kb minified`)
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


const ease = bezier(0.25, 0.1, 0.25, 1.0);
const scroller = document.querySelector(".scroller");
const scrollerContent = document.querySelector(".scroller-content")

const [, go, canGo] = mizuki.createController({ max: 3, min: 0, loop: false });
const [timeout, timedout] = mizuki.createTimeout();
const [getLastUnits, setLastUnits] = mizuki.createState(0);



const next = (index) => index + 1
const prev = (index) => index - 1

const wheelHandler = (event) => {
  if (timedout()) return; // debounce if timeout still persists

  if (event.deltaY > 0) {
    
    if (canGo(next)) { // check if allowed to go to the next slide

      go(next) // set the new index
      timeout(1000); // start timeout for 1 second after setting index

      // animate the element using createAnimation
      mizuki.createAnimation({ duration: 1000 }, (delta) => { 

        const transformValue = getLastUnits() + ease(delta) * -100;
        scrollerContent.style.transform = `translate3d(0, ${transformValue}vh, 0)`;

        return () => { // this will execute after the last frame of requestAnimationFrame loop

          setLastUnits(() => transformValue) // save last position for next animation

        };
      });
    }

  } else if (event.deltaY < 0) {

    if (canGo(prev)) {

      go(prev);
      timeout(1000);

      mizuki.createAnimation({ duration: 1000 }, (delta) => {

        const transformValue = getLastUnits() + ease(delta) * 100;
        scrollerContent.style.transform = `translate3d(0, ${transformValue}vh, 0)`;

        return () => { 

          setLastUnits(() => transformValue)

        };
      });
    }
  }
};

scroller.addEventListener("wheel", wheelHandler);
```

More info of it in [here](https://github.com/jmmaa/mizuki/tree/main/examples)
