function init() {

  // DOM Variables

  const grid = document.querySelector('.grid')

  const cubes = []

  // Variables

  let direction = null

  const snakeArray = []

  let level = 0

  let speed = 1000

  const score = level * 1000

  const width = 16                                              // no. boxed for width

  const height = 11                                             // no. boxes for height

  let snakeLocation = 88

  let foodNumber = null

  Array(height * width).join('.').split('.').forEach(() => {    // create Array
    const box = document.createElement('div')                   // create a div element on the DOM
    box.classList.add('grid-item')                              // create a class called 'grid item' to the div element
    cubes.push(box)
    grid.appendChild(box)                                       // append the element as a child to the 'grid' element
  })

  // Functions

  function userPressedKey(e) {

    if (e.keyCode === 39) {
      direction = 'right'
      // movement()
    }

    if (e.keyCode === 37) {
      direction = 'left'
      // movement()
    }

    if (e.keyCode === 38) {
      direction = 'up'
      // movement()
    }

    if (e.keyCode === 40) {
      direction = 'down'
      // movement()
    }

    cubes.forEach(cube => cube.classList.remove('userOne'))
    cubes.forEach(cube => cube.classList.remove('tail'))
    cubes[snakeLocation].classList.add('userOne')
    snakeArray.forEach(cube => cubes[cube].classList.add('tail'))

    console.log(score)

  }

  function rightMove() {
    remSnake()
    snakeLocation % width < width - 1 ? snakeLocation += 1 : false
    addSnake()
    console.log(`head of snake is at box number ${snakeLocation}`)
  }

  function leftMove() {
    remSnake()
    snakeLocation % width > 0 ? snakeLocation -= 1 : false
    addSnake()
    console.log(`head of snake is at box number ${snakeLocation}`)
  }

  function downMove() {
    remSnake()
    snakeLocation + width < width * height ? snakeLocation += width : false
    addSnake()
    console.log(`head of snake is at box number ${snakeLocation}`)
  }

  function upMove() {
    remSnake()
    snakeLocation - width >= 0 ? snakeLocation -= width : false
    addSnake()
    console.log(`head of snake is at box number ${snakeLocation}`)
  }

  function movement() {
    if (direction === 'right') {
      rightMove()
    }

    if (direction === 'left') {
      leftMove()
    }

    if (direction === 'up') {
      upMove()
    }

    if (direction === 'down') {
      downMove()
    }
    eatFood()
  }

  let timerId = setInterval(movement, speed)

  function eatFood() {
    if (snakeLocation === foodNumber) {
      console.log('eaten')
      level += 1
      speed -= 50
      clearFood()
      createFood()
    }
  }

  function addSnake() {
    cubes[snakeLocation].classList.add('userOne')
    snakeArray.forEach(cube => cubes[cube].classList.add('tail'))
    snakeArray.unshift(snakeLocation)
    snakeArray.splice(level)
    console.log(snakeArray)
    console.log(snakeArray.toString())
  }

  function remSnake() {
    cubes.forEach(cube => cube.classList.remove('userOne'))
    cubes.forEach(cube => cube.classList.remove('tail'))
  }

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

  createFood()
  addSnake()

  // Event handlers
  window.addEventListener('keydown', userPressedKey)  // event handler to listen for user action
}
window.addEventListener('DOMContentLoaded', init)