var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 3;
var ballSpeedY = 3;
var paddle1Y = 35;
const PADDLE_HEIGHT = 100;

window.onload = function() {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var framesPerSecond = 60;
  setInterval(callBoth, 1000/framesPerSecond);

  window.addEventListener("mousemove",
    function(evt) {
      var mousePos = calculateMousePos(evt);
      paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
    });
}

function calculateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  console.log(rect);
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  console.log(mouseX);
  console.log(mouseY);
  return {
    x:mouseX,
    y:mouseY
  }
}

function callBoth() {
  moveEverything();
  drawEverything();
}

function moveEverything() {
  ballX = ballX + ballSpeedX;
  if (ballX > canvas.width || ballX < 0) {
    ballSpeedX = -ballSpeedX;
  }

  ballY = ballY + ballSpeedY;
  if (ballY > canvas.height || ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }
}

function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function colorCircle(centerX, centerY, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
}

function drawEverything() {
  // draw play area
  colorRect(0, 0, canvas.width, canvas.height, "black");

  // draw left player paddle
  colorRect(5, paddle1Y, 5, PADDLE_HEIGHT, "white");

  // draw right player paddle
  colorRect(canvas.width-10, 35, 5, 100, "white");

  //draw ball
  colorCircle(ballX, ballY, 5, "white");
}
