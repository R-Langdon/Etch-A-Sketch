const canvas = document.querySelector('#canvas');
const btn = document.querySelector('#size');
const reset = document.querySelector('#reset');
const eraser = document.querySelector('#eraser');
const blue = document.querySelector('#blue');
const green = document.querySelector('#green');
const red = document.querySelector('#red');
const gray = document.querySelector('#gray');
const rainbow = document.querySelector('#rainbow');
const shaded = document.querySelector('#shaded');

btn.addEventListener('click', changeSize);

reset.addEventListener('click', resetCanvas);

eraser.addEventListener('click', () => {
  cellColor = "eraser";
})

blue.addEventListener('click', () => {
  cellColor = "blue";
})

green.addEventListener('click', () => {
  cellColor = "green";
})

red.addEventListener('click', () => {
  cellColor = "red";
})

gray.addEventListener('click', () => {
  cellColor = "gray";
})

rainbow.addEventListener('click', () => {
  cellColor = "rainbow";
})

shaded.addEventListener('click', () => {
  cellColor = "rgba(155, 155, 155, 0.11)";
})

/*Initialize canvas*/
let cellColor = "gray";
createCanvas(16);

/*Create grid and add child elements*/
function createCanvas(size) {
  canvas.setAttribute('style', `grid-template-columns: repeat(${size}, 1fr); grid-template-rows: repeat(${size}, 1fr)`);

  for (let i = 0; i < size**2; i++) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    canvas.appendChild(cell);
    cell.addEventListener('mouseover', changeColor);
  }
}

/*Change cell color*/
function changeColor(e) {
  if (cellColor === "blue") {
    e.target.style.backgroundColor = "rgba(008, 112, 215, 0.91)";
  } else if (cellColor === "green") {
    e.target.style.backgroundColor = "rgba(028, 251, 66, 0.91)";
  } else if (cellColor === "red") {
    e.target.style.backgroundColor = "rgba(227, 011, 011, 0.91)";
  } else if (cellColor === "gray") {
    e.target.style.backgroundColor = "rgba(0, 0, 0, 0.91)";
  } else if (cellColor === "rainbow") {
    e.target.style.backgroundColor = getRandom();
  } else if (cellColor === "eraser") {
    let rgb = e.target.style.backgroundColor.slice(0, -6)
    let alpha = Number(e.target.style.backgroundColor.slice(-5, -1));
    if (alpha > 0.01) {
      e.target.style.backgroundColor = `${rgb} ${alpha - 0.1})`;
    } else if (alpha == 0.01) {
      e.target.style.backgroundColor = "rgb(255, 255, 255)"; 
    }
  } else if (e.target.style.backgroundColor.includes("rgba(155,")) {
    let currentOpacity = Number(e.target.style.backgroundColor.slice(-5, -1));
    if (currentOpacity < 0.9) {
      e.target.style.backgroundColor = `rgba(155, 155, 155, ${currentOpacity + 0.1})`;
    } else if (currentOpacity == 0.91) {
      e.target.style.backgroundColor = "rgba(155, 155, 155, 0.91)";
    }
  } else {
    e.target.style.backgroundColor = cellColor;
  }

}

/*Remove all child elements from canvas*/
function clearCanvas() {
  while (canvas.hasChildNodes()) {
    canvas.removeChild(canvas.firstChild);
  }
}

/*Change canvas resolution*/
function changeSize() {
  clearCanvas();
  let newSize = document.getElementById('newSize').value;
  
  if (newSize < 1 || newSize > 100 || isNaN(newSize)) {
    alert("Number must be between 1 and 100");
    createCanvas(16); /*resets to default*/
  } else {
    createCanvas(newSize);
  }
}

/*Clear color from canvas*/
function resetCanvas() {
  let pixels = document.querySelectorAll('.cell');
  for(let i = 0; i < pixels.length; i++) {
    pixels[i].style.backgroundColor = "white";
  }
}

/*randomize RGBA color*/
function getRandom() {
  let color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.91)`;
  return color;
}
