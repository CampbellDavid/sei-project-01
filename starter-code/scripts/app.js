function init() {

  // DOM Variables

  const grid = document.querySelector('.grid')

  const cubes = []

  // Variables

  let level = 0

  let score = 0

  const width = 16                                              // no. boxed for width

  const height = 11                                             // no. boxes for height

  let snakeLocation = Math.floor((height * width) / 2)

  Array(height * width).join('.').split('.').forEach(() => {    // create Array
    const box = document.createElement('div')                   // create a div element on the DOM
    box.classList.add('grid-item')                              // create a class called 'grid item' to the div element
    cubes.push(box)
    grid.appendChild(box)                                       // append the element as a child to the 'grid' element
  })

  // Functions

  function snakePosition() {

    cubes[snakeLocation].classList.add('userOne')


    function userPressedKey(e) {

      function rightMove() {
        if (snakeLocation % width < width - 1) {
          snakeLocation++
        }
      }

      function leftMove() {
        if (snakeLocation % width > 0) {
          snakeLocation--
        }
      }

      function upMove() {
        if (snakeLocation - width >= 0) {
          snakeLocation -= width
        }
      }

      function downMove() {
        if (snakeLocation + width < width * height) {
          snakeLocation += width
        }
      }

      switch (e.keyCode) {

        case 39:  // right arrow
          rightMove()
          break
        case 37:  // left arrow
          leftMove()
          break
        case 40:  // down arrow
          downMove()
          break
        case 38:  // up arrow	
          upMove()
          break
        default:
          console.log('player shouldnt move')
      }
      cubes.forEach(cube => cube.classList.remove('userOne'))
      cubes[snakeLocation].classList.add('userOne')

      console.log(`head of snake is at box number ${snakeLocation}`)

    }

    window.addEventListener('keydown', userPressedKey)  // event handler to listen for user action

  }

  function createFood() {

    const randomNumbers = new Set()
    console.log(randomNumbers)

    function generateFood() {
      while (randomNumbers.size < 1) {
        const foodNumber = Math.floor(Math.random() * ((width * height) - 1))
        if (foodNumber !== snakeLocation) {
          randomNumbers.add(foodNumber)
          cubes[foodNumber].classList.add('food-location')
          console.log('food is located in box no', foodNumber)
        } else {
          randomNumbers.add(foodNumber - 1)
          cubes[foodNumber - 1].classList.add('food-location')
          console.log('food was located in box no', foodNumber, 'now', (foodNumber - 1))
        }

        console.log(foodNumber)

      }
    }

    generateFood()

  }

  snakePosition()
  createFood()

  // Event handlers

}
window.addEventListener('DOMContentLoaded', init)