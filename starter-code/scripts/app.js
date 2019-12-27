function init() {
  // DOM Variables

  const grid = document.querySelector('.grid')


  // Variables

  const width = 16                                            // no. boxed for width

  const height = 11                                           // no. boxes for height

  Array(height * width).join('.').split('.').forEach(() => {  // create Array
    const square = document.createElement('div')              // create a div element on the DOM
    square.classList.add('grid-item')                         // create a class called 'grid item' to the div element
    grid.appendChild(square)                                  // append the element as a child to the 'grid' element
  })


  // Functions

  // function userPressedKey(e) {
  //   switch (e.keyCode) {
  //     case 39:
  //       if (snakeLocation % width < width - 1) {
  //         snakeLocation++
  //       }
  //       break
  //     case 37:
  //       if (snakeLocation % width > 0) {
  //         snakeLocation--
  //       }
  //       break
  //     case 40:
  //       if (snakeLocation + width < width * width) {
  //         snakeLocation += width 
  //       }
  //       break
  //     case 38:
  //       if (snakeLocation - width >= 0) {
  //         snakeLocation -= width
  //       } 
  //       break
  //     default:
  //       console.log('player shouldnt move')
  //   }
  // }


  // Event handlers

  // window.addEventListener('keydown', userPressedKey)

  













}
window.addEventListener('DOMContentLoaded', init)
