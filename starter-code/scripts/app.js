function init() {

  // DOM Variables

  const grid = document.querySelector('.grid')

  const loseScreenDiv = document.createElement('div')

  const newGameButton = document.createElement('button')

  const outerBox = document.querySelector('.outer-box')

  const scoreDisplay = document.createElement('div')

  const startGame = document.createElement('button')

  let cubes = []



  // Variables

  const height = 11

  const width = 16

  let direction = null

  let level = 0

  let gameOver = false

  let running = false

  let snakeArray = []

  let snakeLocation = 88

  let speed = 350

  let totalScore = 0



  // Functions

  initiation()

  function initiation() {
    if (gameOver) {
      outerBox.removeChild(newGameButton)
    }

    startGame.classList.add('start-game')
    startGame.innerHTML = 'New Game'
    outerBox.appendChild(startGame)

    reset()
  }

  function timer() {
    if (running) {
      setTimeout(movement, speed)
    }
  }

  function stopTimer() {
    if (!running) {
      clearTimeout()
    }
  }

  function makeGrid() {
    Array(height * width).join('.').split('.').forEach(() => {
      const box = document.createElement('div')
      box.classList.add('grid-item')
      cubes.push(box)
      grid.appendChild(box)
    })
  }

  function killGame() {
    running = false
    gameOver = true
    stopTimer()
    removeSnake()
    clearFood()
    grid.innerHTML = ''
    loseScreen()
    newGameButton.classList.add('new-game-button')
    newGameButton.innerHTML = 'Play Again'
    outerBox.appendChild(newGameButton)
  }

  function loseScreen() {
    outerBox.removeChild(scoreDisplay)
    loseScreenDiv.classList.add('lose-screen-div')
    loseScreenDiv.innerHTML = `GAME OVER! Final Score: ${totalScore}`
    outerBox.appendChild(loseScreenDiv)
  }

  function reset() {
    grid.innerHTML = ''
    cubes = []
    snakeArray = []
    direction = null
    level = 0
    speed = 350
    snakeLocation = 88
    totalScore = 0

    if (gameOver) {
      outerBox.removeChild(loseScreenDiv)
      gameOver = false
    }
  }

  function selfCollision() {
    for (let i = 1; i < snakeArray.length; i++) {
      if (snakeLocation === snakeArray[i]) {
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
    removeSnake()
    snakeLocation % width < width - 1 ? snakeLocation += 1 : killGame()
    addSnake()
  }

  function leftMove() {
    removeSnake()
    snakeLocation % width > 0 ? snakeLocation -= 1 : killGame()
    addSnake()
  }

  function downMove() {
    removeSnake()
    snakeLocation + width < width * height ? snakeLocation += width : killGame()
    addSnake()
  }

  function upMove() {
    removeSnake()
    snakeLocation - width >= 0 ? snakeLocation -= width : killGame()
    addSnake()
  }

  function eatFood() {
    if (cubes[snakeLocation].classList.contains('food-location')) {
      level += 1
      speed -= 15
      totalScore += 1000
      scoreDisplay.innerHTML = `Score: ${totalScore}`
      clearFood()
      createFood()
    }
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
    timer()
  }

  function addSnake() {
    cubes[snakeLocation].classList.add('userOne')
    snakeArray.forEach(cube => cubes[cube].classList.add('tail'))
    snakeArray.unshift(snakeLocation)
    snakeArray.splice(level)
    selfCollision()
  }

  function removeSnake() {
    cubes.forEach(cube => cube.classList.remove('userOne'))
    cubes.forEach(cube => cube.classList.remove('tail'))
  }

  function clearFood() {
    cubes.forEach(cube => cube.classList.remove('food-location'))
  }

  function createFood() {
    const foodNumber = Math.floor(Math.random() * (width * height))

    cubes[foodNumber].classList.add('food-location')

    if (cubes[foodNumber].classList.contains('userOne') || cubes[foodNumber].classList.contains('tail')) {
      clearFood()
      createFood()
    }
  }

  function newGame() {

    if (!gameOver) {
      outerBox.removeChild(startGame)
    } else {
      outerBox.removeChild(newGameButton)
      reset()
    }

    if (!running) {
      makeGrid()
      createFood()
      addSnake()
      running = true
    }

    scoreDisplay.classList.add('score-display')
    scoreDisplay.innerHTML = 'Score: 0000'
    outerBox.appendChild(scoreDisplay)

  }



  // Event handlers

  startGame.addEventListener('click', newGame)

  startGame.addEventListener('click', timer)

  newGameButton.addEventListener('click', newGame)

  newGameButton.addEventListener('click', timer)

  window.addEventListener('keydown', userPressedKey)
}
window.addEventListener('DOMContentLoaded', init)