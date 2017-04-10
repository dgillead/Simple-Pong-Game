var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 1;

window.onload = function() {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");
  var framesPerSecond = 60;
  setInterval(callBoth, 1000/framesPerSecond);
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
  colorRect(0, 35, 5, 50, "white");

  // draw right player paddle
  colorRect(canvas.width-5, 35, 5, 50, "white");

  //draw ball
  colorCircle(ballX, 50, 5, "white");
}
