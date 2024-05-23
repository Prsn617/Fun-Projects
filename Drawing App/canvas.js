let canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth - 250;
canvas.height = window.innerHeight;

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const buttons = document.querySelectorAll(".btn");
const clearScreen = document.querySelector(".cls");
const downloadLnk = document.getElementById("downloadLnk");
const colorPicker = document.getElementById("colorPicker");

let c = canvas.getContext("2d");
c.fillStyle = "#fff";
c.fillRect(0, 0, innerWidth, innerHeight);

function drawCircle(x, y, r, clr) {
  c.beginPath();
  c.arc(x, y, r, 0, 2 * Math.PI);
  c.fillStyle = clr;
  c.fill();
}
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function download() {
  let dt = canvas.toDataURL("image/png");
  this.href = dt;
}

let color = "black";
let width;

class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }
  draw() {
    drawCircle(this.x, this.y, this.radius, this.color);
  }

  update() {
    this.draw();
  }
}

downloadLnk.addEventListener("click", download, false);

let circleList = [];

function animate() {
  clearScreen.addEventListener("click", () => {
    c.fillStyle = "white";
    c.fillRect(0, 0, WIDTH, HEIGHT);
    circleList = [[]];
  });
  requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, WIDTH, HEIGHT);

  colorPicker.addEventListener("change", (e) => {
    color = e.target.value;
  });

  width = document.getElementById("brushSlider").value;
  for (let button of buttons) {
    button.addEventListener("click", (e) => {
      color = e.target.id;
    });
  }

  for (let i = 0; i < circleList.length; i++) {
    for (let j = 0; j < circleList[i].length; j++) {
      circleList[i][j].draw();
      if (j < circleList[i].length - 1) {
        c.lineWidth = parseInt(circleList[i][j].radius * 2);
        c.strokeStyle = circleList[i][j].color;
        c.beginPath();
        c.moveTo(circleList[i][j].x, circleList[i][j].y);
        c.lineTo(circleList[i][j + 1].x, circleList[i][j + 1].y);
        c.stroke();
      }
    }
  }
}

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
      new Circle(e.clientX, e.clientY, width / 2, color)
    );
  }
});
