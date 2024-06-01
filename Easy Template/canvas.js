let canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

let c = canvas.getContext("2d");
let background = "#f0f0f0";
c.fillStyle = background;
c.fillRect(0, 0, innerWidth, innerHeight);

function animate() {
  requestAnimationFrame(animate);
}

animate();
