var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 5;
var ballSpeedY = 5;
var paddle1Y = 35;
var paddle2Y = 35;
var player1Score = 0;
var computerScore = 0;
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

// re-factor later, this function is probably not necessary
function callBoth() {
  moveEverything();
  drawEverything();
}

// reset ball position, speed of ball and reverse direction
function ballReset() {
  ballSpeedX = 5;
  ballSpeedX = -ballSpeedX;
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}

function computerMovement() {
 var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);
  if (paddle2YCenter < ballY) {
    paddle2Y += 5;
  } else {
    paddle2Y -= 5;
  }
}

// really sloppy, try to trim later
function moveEverything() {
  computerMovement();

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX > canvas.width || ballX < 0) {
    // if ball comes in contact with either paddle reverse direction and increase
    // speed of ball
    if ((ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) ||
       (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT && ballX > canvas.width / 2)) {
         ballSpeedX = -ballSpeedX;
         if (ballSpeedX > 0) {
           ballSpeedX += 5;
         } else {
           ballSpeedX -= 5;
         }
    } else {
      if (ballX < 0) {
        computerScore++;
      }
      else {
        player1Score++;
      }
      ballReset();
    }
  }

  if (ballY > canvas.height || ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }
}

// draw rectangles
function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

// draw circles
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

  // draw scores
  canvasContext.fillText(player1Score, 100, 100);
  canvasContext.fillText(computerScore, canvas.width - 100, 100);
}
