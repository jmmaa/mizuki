import './style.css'
import mizuki from "mizuki"
import bezier from 'bezier-easing'


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


