import './style.css'
import mizuki from "mizuki"
import bezier from 'bezier-easing'


const scroller = document.querySelector(".scroller")
const scrollerContent = document.querySelector(".scroller-content")
const ease = bezier(0.25, 0.1, 0.25, 1.0)


const animate = mizuki.createAnimation()
const transition = mizuki.createTransitionFunction({max: 3, min: 0, loop: false})
const [timeout, isTimedout] = mizuki.createTimeout()
const [index, setIndex] = mizuki.createState(0)



const wheelHandler = (event) => {
    if (isTimedout()) return;

    if (event.deltaY > 0) {
      const oldIndex = index();
      const newIndex = transition(oldIndex, (index) => index + 1);
      if (newIndex === oldIndex) return;

      setIndex(() => newIndex);

      animate((delta, units) => {
        if (scroller === null) return;
        let newUnits = units + ease(delta) * -100;
        scrollerContent.style.transform = `translate3d(0, ${newUnits}vh, 0)`;

        return () => newUnits;
      }, 1000);

      timeout(1000);
    } else if (event.deltaY < 0) {
      const oldIndex = index();
      const newIndex = transition(oldIndex, (index) => index - 1);
      if (newIndex === oldIndex) return;

      setIndex(() => newIndex);

      animate((delta, units) => {
        if (scroller === null) return;
        let newUnits = units + ease(delta) * 100;
        scrollerContent.style.transform = `translate3d(0, ${newUnits}vh, 0)`;

        return () => newUnits;
      }, 1000);

      timeout(1000);
    }
  };



scroller.addEventListener("wheel", wheelHandler)

// TRY WRAPPING THE EVENT IN createState

