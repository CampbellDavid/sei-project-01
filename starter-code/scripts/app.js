function init() {

  // DOM Variables

  const outerBox = document.querySelector('.outer-box')

  const grid = document.querySelector('.grid')

  const cubes = []

  const startGame = document.createElement('button')

  const finalScoreDisplay = document.createElement('div')



  // Variables

  let running = false

  let direction = null

  let snakeLocation = 88

  const snakeArray = []

  let level = 0

  let speed = 350

  const width = 16

  const height = 11

  let foodNumber = null

  let movementTimer = null
  console.log(`NEW move counter = ${movementTimer}`)

  

  // Functions

  freshGame()

  function freshGame() {
    startGame.classList.add('start-game')
    startGame.innerHTML = 'New Game'
    outerBox.appendChild(startGame)
    startGame.addEventListener('click', newGame)
    startGame.addEventListener('click', timer)
  }

  function timer() {
    if (running) {
      movementTimer = setTimeout(movement, speed)
      console.log(`move counter = ${movementTimer}`)
    }
    console.log(`running for timer is ${running}`)
  }

  function stopTimer() {
    if (!running) {
      console.log('timer should have stopped')
      movementTimer = clearTimeout(movementTimer)
      console.log(`move counter = ${movementTimer}`)
    }
  }

  function makeGrid() {
    Array(height * width).join('.').split('.').forEach(() => {    // create Array
      const box = document.createElement('div')                   // create a div element on the DOM
      box.classList.add('grid-item')                              // create a class called 'grid item' to the div element
      cubes.push(box)
      grid.appendChild(box)                                       // append the element as a child to the 'grid' element
    })
  }

  function killGame() {
    console.log('game over')
    running = false
    stopTimer()
    remSnake()
    clearFood()
    grid.innerHTML = ''
    finalScore()
    freshGame()
  }

  function finalScore() {
    console.log(`Final score is ${level * 1000}`)
    console.log(`Final level is ${level}`)
    finalScoreDisplay.classList.add('final-score')
    finalScoreDisplay.innerHTML = (`Final score is ${level * 1000}`)
    outerBox.appendChild(finalScoreDisplay)
  }

  function snakeRamsItself() {
    for (let i = 1; i < snakeArray.length; i++) {
      if (snakeLocation === snakeArray[i]) {
        console.log('snake crash!')
        killGame()
      }
    }
  }

  function userPressedKey(e) {

    if (e.keyCode === 39) {
      if (direction !== 'left') {
        direction = 'right'
      }
    }

    if (e.keyCode === 37) {
      if (direction !== 'right') {
        direction = 'left'
      }
    }

    if (e.keyCode === 38) {
      if (direction !== 'down') {
        direction = 'up'
      }
    }

    if (e.keyCode === 40) {
      if (direction !== 'up') {
        direction = 'down'
      }
    }

    cubes.forEach(cube => cube.classList.remove('userOne'))
    cubes.forEach(cube => cube.classList.remove('tail'))
    cubes[snakeLocation].classList.add('userOne')
    snakeArray.forEach(cube => cubes[cube].classList.add('tail'))

  }

  function rightMove() {
    remSnake()
    snakeLocation % width < width - 1 ? snakeLocation += 1 : killGame()
    addSnake()
    console.log(`head of snake is at box number ${snakeLocation}`)
  }

  function leftMove() {
    remSnake()
    snakeLocation % width > 0 ? snakeLocation -= 1 : killGame()
    addSnake()
    console.log(`head of snake is at box number ${snakeLocation}`)
  }

  function downMove() {
    remSnake()
    snakeLocation + width < width * height ? snakeLocation += width : killGame()
    addSnake()
    console.log(`head of snake is at box number ${snakeLocation}`)
  }

  function upMove() {
    remSnake()
    snakeLocation - width >= 0 ? snakeLocation -= width : killGame()
    addSnake()
    console.log(`head of snake is at box number ${snakeLocation}`)
  }

  function eatFood() {
    if (snakeLocation === foodNumber) {
      console.log('eaten')
      level += 1
      console.log(level)
      speed -= 15
      console.log(speed)
      clearFood()
      createFood()
    }
  }

  function movement() {
    console.log('movement is still happening')
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
    timer()
    console.log(`movement speed is ${speed}`)
  }

  function addSnake() {
    cubes[snakeLocation].classList.add('userOne')
    snakeArray.forEach(cube => cubes[cube].classList.add('tail'))
    snakeArray.unshift(snakeLocation)
    snakeArray.splice(level)
    console.log(snakeArray)
    console.log(snakeLocation)
    console.log(snakeArray.toString())
    snakeRamsItself()
  }

  function remSnake() {
    cubes.forEach(cube => cube.classList.remove('userOne'))
    cubes.forEach(cube => cube.classList.remove('tail'))
  }

  function clearFood() {
    cubes[foodNumber].classList.remove('food-location')
  }

  function createFood() {

    const randomNumbers = new Set()
    console.log(randomNumbers)

    function generateFood() {
      while (randomNumbers.size < 1) {
        foodNumber = Math.floor(Math.random() * ((width * height) - 1))
        if (foodNumber !== snakeLocation && foodNumber) {
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

  function newGame() {
    outerBox.removeChild(startGame)
    if (!running) {
      makeGrid()
      createFood()
      addSnake()
      running = true
      console.log(running)
    }
  }



  // Event handlers

  window.addEventListener('keydown', userPressedKey)
}
window.addEventListener('DOMContentLoaded', init)