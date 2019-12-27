function init() {
  // DOM Variables

  const grid = document.querySelector('.grid')

  const cubes = []



  // Variables


  const width = 16                                            // no. boxed for width

  const height = 11                                           // no. boxes for height

  let snakeLocation = 1

  Array(height * width).join('.').split('.').forEach(() => {  // create Array
    const box = document.createElement('div')              // create a div element on the DOM
    box.classList.add('grid-item')                         // create a class called 'grid item' to the div element
    cubes.push(box)
    grid.appendChild(box)                                  // append the element as a child to the 'grid' element
  })


  // Functions

  // function newGame () {

  // }

  cubes[snakeLocation].classList.add('userOne')

  function userPressedKey(e) {
    switch (e.keyCode) {
      case 39:  // right arrow	
        if (snakeLocation % width < width - 1) {
          snakeLocation++
        }
        break
      case 37:  // left arrow
        if (snakeLocation % width > 0) {
          snakeLocation--
        }
        break
      case 40:  // down arrow
        if (snakeLocation + width < width * height) {
          snakeLocation += width
        }
        break
      case 38:  // up arrow	
        if (snakeLocation - width >= 0) {
          snakeLocation -= width
        }
        break
      default:
        console.log('player shouldnt move')
    }
    cubes.forEach(cube => cube.classList.remove('userOne'))
    cubes[snakeLocation].classList.add('userOne')
    console.log('current plauer index is', snakeLocation)
  }

  function createFood() {
    const randomNumbers = new Set()
    while (randomNumbers.size < 1) {
      const randomNumber = Math.floor(Math.random() * ((width * height) - 1))
      console.log(randomNumber)
      randomNumbers.add(randomNumber)
      cubes[randomNumber].classList.add('food-location')
    }
  }

  createFood()


  // Event handlers

  window.addEventListener('keydown', userPressedKey)















}
window.addEventListener('DOMContentLoaded', init)
