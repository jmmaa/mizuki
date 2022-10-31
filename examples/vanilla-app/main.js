import './style.css'
import mizuki from "mizuki"

// declare mizuki constructor
const counterConfig = mizuki()

// declare mizuki engine
const { get, set } = counterConfig({ delay: 0, bounds: { min: 0, max: 3 }, loop: true, init: 1 })

// elements
const incrementButton =document.querySelector(".inc")
const decrementButton = document.querySelector(".dec")
const counter = document.querySelector(".counter")


counter.innerHTML = get() // get the initial index

incrementButton.addEventListener("click", () => {

  set((index) => index + 1) // set the index
  counter.innerHTML = get() // update the index

})

decrementButton.addEventListener("click", () => {
  set((index) => index - 1)
  counter.innerHTML = get()

})



