import './style.css'
import mizuki from "mizuki"
import bezier from 'bezier-easing'



const scroller = document.querySelector(".scroller")
const scrollerContent = document.querySelector(".scroller-content")

const ease = bezier(0.25, 0.1, 0.25, 1.0)
const shift = mizuki.createAction({ min: 0, max: 3, delay: 1000, loop: false})
const animate = mizuki.createAnimation()

let index = 0


scroller.addEventListener("pointerdown", (event) => console.log(event))

scroller.addEventListener("pointerup", (event) => console.log(event))

scroller.addEventListener("pointermove", (event) => {

  console.log(event.clientX)

})

scroller.addEventListener("wheel", (e) => {

  if (e.deltaY > 0) {
    const newIndex = shift(index + 1)

    if (newIndex === undefined) return
    index = newIndex

    animate((delta, prev) => {

      const frameValue = prev - ease(delta) * 100 
      scrollerContent.style.transform = `translate3d(0, ${frameValue}vh, 0)`

      return () => frameValue

    }, 1000)
    

  } else if (e.deltaY < 0) {

    const newIndex = shift(index - 1)

    if (newIndex === undefined) return
    index = newIndex


    animate((delta, prev) => {

      const frameValue = prev + ease(delta) * 100 
      scrollerContent.style.transform = `translate3d(0, ${frameValue}vh, 0)`
      
      return () => frameValue

    }, 1000)
  }
})

