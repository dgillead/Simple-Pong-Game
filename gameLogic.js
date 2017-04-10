var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 5;
var ballSpeedY = 5;
var paddle1Y = 35;
var paddle2Y = 35;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

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
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x:mouseX,
    y:mouseY
  }
}

function callBoth() {
  moveEverything();
  drawEverything();
}

function ballReset() {
  ballSpeedX = -ballSpeedX;
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}

function moveEverything() {
  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;

  if (ballX > canvas.width || ballX < 0) {
    if ((ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) ||
       (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT)) {
         ballSpeedX = -ballSpeedX + 1;
    } else {
      ballReset();
    }
  }

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
  colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");

  // draw right computer paddle
  colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, 100, "white");

  //draw ball
  colorCircle(ballX, ballY, 5, "white");
}
