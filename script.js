/* eslint-disable guard-for-in */
/* eslint-disable prefer-const */
/* eslint-disable no-restricted-syntax */
const getButton = document.getElementById('button-random-color');
const getColorOne = document.getElementById('color-one');
const getColorTwo = document.getElementById('color-two');
const getColorThree = document.getElementById('color-three');
const getColorFour = document.getElementById('color-four');
const buttonClear = document.getElementById('clear-board');
const pixelBoard = document.getElementById('pixel-board');

function colorRandom() {
  const r = Math.random() * 255;
  const g = Math.random() * 255;
  const b = Math.random() * 255;

  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, 1)`;
}

let colorTwo = 'blue';
let colorThree = 'red';
let colorFour = 'orange';

getButton.addEventListener('click', () => {
  colorTwo = colorRandom();
  colorThree = colorRandom();
  colorFour = colorRandom();
  getColorTwo.style.backgroundColor = colorTwo;
  getColorThree.style.backgroundColor = colorThree;
  getColorFour.style.backgroundColor = colorFour;
  const colorPalette = {
    color2: colorTwo,
    color3: colorThree,
    color4: colorFour,
  };
  localStorage.setItem('colorPalette', JSON.stringify(colorPalette));
});

function setPaletteColor() {
  const object = JSON.parse(localStorage.getItem('colorPalette')) || {};
  getColorTwo.style.backgroundColor = object.color2;
  getColorThree.style.backgroundColor = object.color3;
  getColorFour.style.backgroundColor = object.color4;
  colorTwo = object.color2 ? object.color2 : 'blue';
  colorThree = object.color3 ? object.color3 : 'red';
  colorFour = object.color4 ? object.color4 : 'orange';
}
setPaletteColor();

function pixelsBoard() {
  for (let index = 1; index <= 25; index += 1) {
    const createDiv = document.createElement('div');
    createDiv.className = 'pixel';
    pixelBoard.appendChild(createDiv);
    createDiv.addEventListener('click', fillPixel);
  }
}
pixelsBoard();

let colorSelected = 'black';

function buttonOneColor() {
  document.getElementsByClassName('selected')[0].classList.remove('selected');
  getColorOne.className = 'color selected';
  colorSelected = 'black';
}
getColorOne.addEventListener('click', buttonOneColor);

function buttonTwoColor() {
  document.getElementsByClassName('selected')[0].classList.remove('selected');
  getColorTwo.className = 'color selected';
  colorSelected = colorTwo;
}
getColorTwo.addEventListener('click', buttonTwoColor);

function buttonThreeColor() {
  document.getElementsByClassName('selected')[0].classList.remove('selected');
  getColorThree.className = 'color selected';
  colorSelected = colorThree;
}
getColorThree.addEventListener('click', buttonThreeColor);

function buttonFourColor() {
  document.getElementsByClassName('selected')[0].classList.remove('selected');
  getColorFour.className = 'color selected';
  colorSelected = colorFour;
}
getColorFour.addEventListener('click', buttonFourColor);

function fillPixel(event) {
  event.target.style.backgroundColor = colorSelected;
  salveColorPixelBoard();
}

function clearColor() {
  const listBoard = document.querySelectorAll('#pixel-board .pixel');
  for (const indice in listBoard) {
    if (listBoard[indice].style) {
      listBoard[indice].style.backgroundColor = 'white';
    }
  }
}
buttonClear.addEventListener('click', clearColor);

function salveColorPixelBoard() {
  localStorage.setItem('pixelBoard', pixelBoard.innerHTML);
}

function recuperaPixels() {
  const innerHTMLPixels = localStorage.getItem('pixelBoard');
  if (innerHTMLPixels) {
    pixelBoard.innerHTML = innerHTMLPixels;
    const pixels = document.querySelectorAll('.pixel');
    const listPixels = Array.from(pixels);
    for (let index in listPixels) {
      listPixels[index].addEventListener('click', fillPixel);
    }
  }
}
window.onload = recuperaPixels;
