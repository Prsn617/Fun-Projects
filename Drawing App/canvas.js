let canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth - 250;
canvas.height = window.innerHeight;

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

let c = canvas.getContext("2d");
let background = "#f0f0f0";
c.fillStyle = background;
c.fillRect(0, 0, innerWidth, innerHeight);

function drawCircle(x, y, r, color) {
  c.beginPath();
  c.arc(x, y, r, 0, 2 * Math.PI);
  c.fillStyle = color;
  c.fill();
}
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let color = "black";
let width;

class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = radius;
  }
  draw() {
    drawCircle(this.x, this.y, this.radius, this.color);
  }

  update() {
    this.draw();
  }
}

let circleList = [];
function init() {
  circleList = [];
}

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = background;
  c.fillRect(0, 0, innerWidth, innerHeight);

  width = document.getElementById("brushSlider").value;

  for (let i = 0; i < circleList.length; i++) {
    for (let j = 0; j < circleList[i].length; j++) {
      circleList[i][j].draw(width);
      if (j < circleList[i].length - 1) {
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(circleList[i][j].x, circleList[i][j].y);
        c.lineTo(circleList[i][j + 1].x, circleList[i][j + 1].y);
        c.stroke();
      }
    }
  }
}

init();
animate();

let isDragging = false;
addEventListener("mousedown", (e) => {
  isDragging = true;
});
addEventListener("mouseup", (e) => {
  isDragging = false;
  circleList.push([]);
});
addEventListener("mousemove", (e) => {
  if (isDragging) {
    if (circleList.length === 0) {
      circleList.push([]);
    }
    circleList[circleList.length - 1].push(
      new Circle(e.clientX, e.clientY, width, color)
    );
  }
});
