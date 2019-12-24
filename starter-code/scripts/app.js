function init() {
  // DOM Variables

  const grid = document.querySelector('.grid')


  // Variables

  const width = 16

  const height = 11

  Array(height * width).join('.').split('.').forEach(() => {
    const square = document.createElement('div')              // create a div element on the DOM
    square.classList.add('grid-item')                         // create a class called 'grid item' to the div element
    grid.appendChild(square)                                  // append the element as a child to the 'grid' element
  })


  // Functions




















}
window.addEventListener('DOMContentLoaded', init)
