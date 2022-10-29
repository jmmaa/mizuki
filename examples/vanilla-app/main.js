import './style.css'
import mizuki from "mizuki"

// config
const { get, set } = mizuki({delay: 1000, min: 0, max: 3})

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



