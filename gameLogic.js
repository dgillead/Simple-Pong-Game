var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 5;

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

function drawEverything() {
  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  canvasContext.fillStyle = "white";
  canvasContext.fillRect(0, 35, 5, 50);
  canvasContext.fillStyle = "red";
  canvasContext.fillRect(ballX, canvas.height/2, 5, 5);
}
