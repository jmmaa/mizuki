import './style.css'
import mizuki from "mizuki"

// declare mizuki engine constructor
const createEngine = mizuki()


// declare mizuki engines
// having multiple engines will allow you to set different config for setting mizuki's index
const fast = createEngine({ delay: 0, bounds: { min: 0, max: 3 }, loop: true, init: 1 })
const slow = createEngine({ delay: 1000, bounds: { min: 0, max: 3 }, loop: true, init: 0 }) 


const incrementButton =document.querySelector(".inc")
const decrementButton = document.querySelector(".dec")
const counter = document.querySelector(".counter")


counter.innerHTML = fast.get() // get the initial index

incrementButton.addEventListener("click", () => {

  fast.set((index) => index + 1) // set the index
  counter.innerHTML = fast.get() // update the index

})


decrementButton.addEventListener("click", () => {
  slow.set((index) => index - 1)
  counter.innerHTML = fast.get()

})



