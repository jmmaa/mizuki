import './style.css'
import mizuki from "mizuki"
import bezier from 'bezier-easing'


const ease = bezier(0.25, 0.1, 0.25, 1.0);
const scroller = document.querySelector(".scroller");
const scrollerContent = document.querySelector(".scroller-content")

const scrollerButtonNext = document.querySelector(".next")
const scrollerButtonPrev = document.querySelector(".prev")
const scrollerButtonStart = document.querySelector(".start")
const scrollerButtonEnd = document.querySelector(".end")
const scrollerIndex = document.querySelector(".index")


// MAKE A VERSION OF THIS WITHOUT USING THE OLD API
let lastIndex = 0
let currIndex = 0

// reactive
const [index, setIndex] = mizuki.createSignal(0)

// utils
const [timeout, timedout] = mizuki.createTimeout()



const calc = (index) => {
  const min = 0
  const max = 4

  if (index < min) return min
  else if (index > max) return max
  else return index
}


const transition = () => {

  if (currIndex === lastIndex) return
  timeout(700)

  const offsets = [0, -100, -200, -300, -330]

  const currIndexValue = offsets[currIndex]
  const lastIndexValue = offsets[lastIndex]

  const displacement =  currIndexValue - lastIndexValue

  lastIndex = currIndex
  
  mizuki.animate(700, (delta) => {

    const units =  lastIndexValue + ease(delta) * displacement
    scrollerContent.style.transform = `translate3d(0, ${units}vh, 0)`;

  });
}


// ABSTACT THIS (IDK FOR NOW BUT HOPEFULLY SOON I CAN)
// MAYBE MAKE THE API MORE ON REACTION-CENTRIC
// event listeners
scrollerButtonNext.addEventListener("click", () => {
  if (timedout()) return
  setIndex(calc(index() + 1))
})
scrollerButtonPrev.addEventListener("click", () => {
  if (timedout()) return
  setIndex(calc(index() - 1))
})
scrollerButtonStart.addEventListener("click", () => {
  if (timedout()) return
  setIndex(0)
})
scrollerButtonEnd.addEventListener("click", () => {
  if (timedout()) return
  setIndex(3)
})

scroller.addEventListener("wheel", (e) => {
  if (timedout()) return

  if (e.deltaY > 0) {
    setIndex(calc(index() + 1))

  } else if (e.deltaY < 0) {
    setIndex(calc(index() - 1))
  }

})




mizuki.createEffect(() => {
  scrollerIndex.innerHTML = index()
})

mizuki.createEffect(() => {

  const currIndex = index();
  if (currIndex === lastIndex) return
  timeout(700)

  const offsets = [0, -100, -200, -300, -330]

  const currIndexValue = offsets[currIndex]
  const lastIndexValue = offsets[lastIndex]

  const displacement =  currIndexValue - lastIndexValue

  lastIndex = currIndex
  
  mizuki.animate(700, (delta) => {

    const units =  lastIndexValue + ease(delta) * displacement
    scrollerContent.style.transform = `translate3d(0, ${units}vh, 0)`;

  });

})