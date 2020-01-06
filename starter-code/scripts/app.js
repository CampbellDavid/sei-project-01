function init() {

  // DOM Variables

  const grid = document.querySelector('.grid')

  const cubes = []

  // Variables

  let level = 0

  let score = 0

  const width = 16                                              // no. boxed for width

  const height = 11                                             // no. boxes for height

  let snakeLocation = null

  let foodNumber = null

  Array(height * width).join('.').split('.').forEach(() => {    // create Array
    const box = document.createElement('div')                   // create a div element on the DOM
    box.classList.add('grid-item')                              // create a class called 'grid item' to the div element
    cubes.push(box)
    grid.appendChild(box)                                       // append the element as a child to the 'grid' element
  })

  // Functions

  function clearFood() {
    if (foodNumber !== null) {
      console.log(`food at ${foodNumber}`)
      cubes[foodNumber].classList.remove('food-location')
    }
  }

  function createFood() {

    const randomNumbers = new Set()
    console.log(randomNumbers)

    function generateFood() {
      while (randomNumbers.size < 1) {
        foodNumber = Math.floor(Math.random() * ((width * height) - 1))
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

  function snakePosition() {

    snakeLocation = 88

    cubes[snakeLocation].classList.add('userOne')

    function userPressedKey(e) {

      function rightMove() {
        return ((snakeLocation % width < width - 1) ? snakeLocation += 1 : false)
      }

      if (e.keyCode === 39) {
        rightMove()
        console.log(`head of snake is at box number ${snakeLocation}`)
        if (snakeLocation === foodNumber) {
          console.log('eaten')
          score += 1000
          clearFood()
          createFood()
          growSnake()
        }
      }

      function leftMove() {
        return ((snakeLocation % width > 0) ? snakeLocation -= 1 : false)
      }

      if (e.keyCode === 37) {
        leftMove()
        console.log(`head of snake is at box number ${snakeLocation}`)
        if (snakeLocation === foodNumber) {
          console.log('eaten')
          score += 1000
          clearFood()
          createFood()
          growSnake()
        }
      }

      function upMove() {
        return ((snakeLocation - width >= 0) ? snakeLocation -= width : false)
      }

      if (e.keyCode === 38) {
        upMove()
        console.log(`head of snake is at box number ${snakeLocation}`)
        if (snakeLocation === foodNumber) {
          console.log('eaten')
          score += 1000
          clearFood()
          createFood()
          growSnake()
        }
      }

      function downMove() {
        return ((snakeLocation + width < width * height) ? snakeLocation += width : false)
      }

      if (e.keyCode === 40) {
        downMove()
        console.log(`head of snake is at box number ${snakeLocation}`)
        if (snakeLocation === foodNumber) {
          console.log('eaten')
          score += 1000
          clearFood()
          createFood()
          growSnake()
        }
      }

      cubes.forEach(cube => cube.classList.remove('userOne'))
      cubes[snakeLocation].classList.add('userOne')

      console.log(score)

    }

    window.addEventListener('keydown', userPressedKey)  // event handler to listen for user action

  }

  function growSnake() {
    console.log('snake must grow')
  }

  snakePosition()
  createFood()

  

  // Event handlers

}
window.addEventListener('DOMContentLoaded', init)