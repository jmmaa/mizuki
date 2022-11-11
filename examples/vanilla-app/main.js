import './style.css'
import mizuki from "mizuki"

import bezier from 'bezier-easing'



const ease = bezier(0.25, 0.1, 0.25, 1.0)

const shift = mizuki.action({ min: 0, max: 3, delay: 1000, loop: false})
let index = 0
let lastVal = 0
let lastTransformVal = 0
let remaining = 100


const scrollerContent = document.querySelector(".scroller-content")
const scroller = document.querySelector(".scroller")


scroller.addEventListener("wheel", (e) => {



  if (e.deltaY > 0) {
    const newIndex = shift(index + 1)

    if (newIndex === undefined) return
    index = newIndex

    mizuki.createAnimationFrames((delta) => {
      let transformValue = lastVal - ease(delta) * 100
      scrollerContent.style.transform = `translate3d(0, ${transformValue}vh, 0)`
      lastTransformVal = transformValue
    }, 1000)

  } else if (e.deltaY < 0) {
    const newIndex = shift(index - 1)
    
    if (newIndex === undefined) return
    index = newIndex

    mizuki.createAnimationFrames((delta) => {
      let transformValue = lastVal + ease(delta) * 100 
      scrollerContent.style.transform = `translate3d(0, ${transformValue}vh, 0)`
      lastTransformVal = transformValue
    }, 1000)
    
  }
  lastVal = lastTransformVal
  
})

