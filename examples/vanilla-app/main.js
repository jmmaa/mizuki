import './style.css'
import mizuki from "mizuki"
import bezier from 'bezier-easing'



const ease = bezier(0.25, 0.1, 0.25, 1.0);
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


