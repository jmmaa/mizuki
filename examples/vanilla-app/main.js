import './style.css'
import mizuki from "mizuki"
import bezier from 'bezier-easing'


const scroller = document.querySelector(".scroller")
const scrollerContent = document.querySelector(".scroller-content")
const ease = bezier(0.25, 0.1, 0.25, 1.0)



const animate = mizuki.createAnimation()
const onWheel =  mizuki.createEventObserver(scroller, "wheel")
const [timeout, isTimedout] = mizuki.createTimeout()
const [allowedToGo] = mizuki.createIndexTracker({max: 3, min: 0, loop: false})

const wheelHandler = (event) => {
    if (isTimedout()) return; // throttle if timeout still persists

    if (event.deltaY > 0) {

      if (allowedToGo((index) => index + 1)) { // check if allowed to go to the next slide

        animate({ units: -100, duration: 1000 }, (units) => {

          // apply style changes here every frame
          scrollerContent.style.transform = `translate3d(0, ${units}vh, 0)`;
        }, 1000)

        timeout(1000); // timeout for 1 seconds after changing slide
      }

      
    } else if (event.deltaY < 0) {

      if (allowedToGo((index) => index - 1)) {

        animate({ units: 100, duration: 1000 }, (units) => {

          scrollerContent.style.transform = `translate3d(0, ${units}vh, 0)`;

        }, 1000)

        timeout(1000);

      }
    }
  };



onWheel(wheelHandler)

// scroller.addEventListener("wheel", wheelHandler)

// TRY WRAPPING THE EVENT IN createState

