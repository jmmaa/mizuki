import './style.css'
import {vanilla} from "mizuki"



// declare a handler
const { get, set } = vanilla({ delay:500, bounds: { min: 0, max: 3 }, loop: true, init: 1 })

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



