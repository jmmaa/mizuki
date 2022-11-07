import './style.css'
import {vanilla} from "mizuki"



// declare a handler
const { get, set, autoplay } = vanilla({ delay:500, bounds: { min: 0, max: 3 }, loop: true, init: 0 , auto: true})

// elements
const incrementButton =document.querySelector(".inc")
const decrementButton = document.querySelector(".dec")
const subscribeButton = document.querySelector(".sub")
const counter = document.querySelector(".counter")




autoplay.interval.subscribe(() => {
  if (autoplay.timeout.persists()) return
  console.log("working")
  set((index) => index + 1)
  counter.innerHTML = get() 
})

autoplay.interval.start(2000)

counter.innerHTML = get() // get the initial index


incrementButton.addEventListener("click", () => {
  autoplay.timeout.start(2000)
  set((index) => index + 1) // set the index
  counter.innerHTML = get() // update the index
})

decrementButton.addEventListener("click", () => {
  autoplay.timeout.start(2000)
  set((index) => index - 1)
  counter.innerHTML = get()

})

// subscribeButton.addEventListener("click", () => {

// })



