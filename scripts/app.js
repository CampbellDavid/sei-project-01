function init() {

  // DOM Variables

  const grid = document.querySelector('.grid')

  const loseScreenDiv = document.createElement('div')

  const newGameButton = document.createElement('button')

  const outerBox = document.querySelector('.outer-box')

  const supremeBox = document.querySelector('.supreme-box')

  const scoreDisplay = document.createElement('div')

  const startGame = document.createElement('button')

  let cubes = []



  // Variables

  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  const height = 15

  const width = 21

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
      supremeBox.removeChild(newGameButton)
      reset()
    }

    startGame.classList.add('start-game')
    startGame.innerHTML = 'New Game'
    supremeBox.appendChild(startGame)
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
    supremeBox.appendChild(newGameButton)
  }

  function loseScreen() {
    supremeBox.removeChild(scoreDisplay)
    outerBox.removeChild(grid)
    loseScreenDiv.classList.add('lose-screen-div')
    loseScreenDiv.innerHTML = `GAME OVER! Final Value: ${currency.format(totalScore)}`
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
      outerBox.appendChild(grid)
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
      e.preventDefault()
      if (direction !== 'left') {
        direction = 'right'
      }
    }

    if (e.keyCode === 37) {
      e.preventDefault()
      if (direction !== 'right') {
        direction = 'left'
      }
    }

    if (e.keyCode === 38) {
      e.preventDefault()
      if (direction !== 'down') {
        direction = 'up'
      }
    }

    if (e.keyCode === 40) {
      e.preventDefault()
      if (direction !== 'up') {
        direction = 'down'
      }
    }

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
      speed -= 10
      totalScore += 100000000
      scoreDisplay.innerHTML = `Net Worth: ${currency.format(totalScore)}`
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
      supremeBox.removeChild(startGame)
    } else {
      supremeBox.removeChild(newGameButton)
      reset()
    }

    if (!running) {
      grid.innerHTML = ''
      makeGrid()
      createFood()
      addSnake()
      running = true
    }

    timer()

    scoreDisplay.classList.add('score-display')
    scoreDisplay.innerHTML = 'Net Worth: $0.00'
    supremeBox.appendChild(scoreDisplay)
  }



  // Event handlers

  startGame.addEventListener('click', newGame)

  newGameButton.addEventListener('click', newGame)

  window.addEventListener('keydown', userPressedKey)
}
window.addEventListener('DOMContentLoaded', init)