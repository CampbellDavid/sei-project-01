function init() {

  // DOM Variables

  const grid = document.querySelector('.grid')

  const cubes = []

  // Variables

  const snakeArray = []

  let level = 0

  let speed = 1000

  let timerId = null

  const score = level * 1000

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

  function addSnake () {
    cubes[snakeLocation].classList.add('userOne')
    snakeArray.forEach(cube => cubes[cube].classList.add('tail'))
  }

  function remSnake () {
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

  function snakePosition() {

    snakeLocation = 88

    cubes[snakeLocation].classList.add('userOne')

    function userPressedKey(e) {
      
      snakeArray.unshift(snakeLocation)
      snakeArray.splice(level)
      console.log(snakeArray)
      console.log(snakeArray.toString())

      function rightMove() {
        remSnake()
        snakeLocation % width < width - 1 ? snakeLocation += 1 : false
        addSnake()
      }

      if (e.keyCode === 39) {
        timerId = setInterval(rightMove, speed)
        console.log(`head of snake is at box number ${snakeLocation}`)
        if (snakeLocation === foodNumber) {
          console.log('eaten')
          level += 1
          speed -= 50
          clearFood()
          createFood()
        }
      }

      function leftMove() {
        remSnake()
        snakeLocation % width > 0 ? snakeLocation -= 1 : false
        addSnake()
      }

      if (e.keyCode === 37) {
        timerId = setInterval(leftMove, speed)
        console.log(`head of snake is at box number ${snakeLocation}`)
        if (snakeLocation === foodNumber) {
          console.log('eaten')
          level += 1
          speed -= 50
          clearFood()
          createFood()
        }
      }

      function upMove() {
        remSnake()
        snakeLocation - width >= 0 ? snakeLocation -= width : false
        addSnake()
      }

      if (e.keyCode === 38) {
        timerId = setInterval(upMove, speed)
        console.log(`head of snake is at box number ${snakeLocation}`)
        if (snakeLocation === foodNumber) {
          console.log('eaten')
          level += 1
          speed -= 50
          clearFood()
          createFood()
        }
      }

      function downMove() {
        remSnake()
        snakeLocation + width < width * height ? snakeLocation += width : false
        addSnake()
      }

      if (e.keyCode === 40) {
        timerId = setInterval(downMove, speed)
        console.log(`head of snake is at box number ${snakeLocation}`)
        if (snakeLocation === foodNumber) {
          console.log('eaten')
          level += 1
          speed -= 50
          clearFood()
          createFood()
        }
      }

      cubes.forEach(cube => cube.classList.remove('userOne'))
      cubes.forEach(cube => cube.classList.remove('tail'))
      cubes[snakeLocation].classList.add('userOne')
      snakeArray.forEach(cube => cubes[cube].classList.add('tail'))

      console.log(score)

    }

    window.addEventListener('keydown', userPressedKey)  // event handler to listen for user action

  }

  snakePosition()
  createFood()



  // Event handlers

}
window.addEventListener('DOMContentLoaded', init)