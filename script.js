const $canvas = document.querySelector('canvas');
const ctx = $canvas.getContext('2d');
const $width = ($canvas.width = 540);
const $height = ($canvas.height = 380);
const $canvasHalfWidth = $canvas.width / 2;
const $imgKeyboardsLetters = document.querySelector('.keyboard-letters');
const $imgKeyboardsArrows = document.querySelector('.keyboard-arrows');

//Rectangle (left & right) Variables
const rectangleBackgroundColor = 'blue';
const rectangleHeight = 80;
const rectangleWidth = $canvasHalfWidth;
const rectangleX = $canvasHalfWidth - rectangleWidth;
const rectangleY = ($height - rectangleHeight) / 2;
const leftRectangleX = $canvasHalfWidth - rectangleWidth;
const rightRectangleX = $canvasHalfWidth;
let delay = generateDelayOfIA();

function rectanglesPlayers() {
  //Left Rectangle
  const gradient = ctx.createLinearGradient(0, 0, $width, $height);
  gradient.addColorStop(0.3, '#04aa6d');
  gradient.addColorStop(0.6, '#fff');
  gradient.addColorStop(0.9, '#04aa6d');
  ctx.fillStyle = gradient;
  ctx.fillRect(rectangleX, rectangleY, rectangleWidth, rectangleHeight);
  ctx.fillStyle = '#fff';
  ctx.font = '32px Symtext';
  ctx.fillText(
    '1 PLAYER',
    $canvasHalfWidth - $canvasHalfWidth / 2,
    $height / 1.9
  );

  //Right Rectangle
  const gradient2 = ctx.createLinearGradient(0, 0, $width, $height);
  gradient2.addColorStop(0.3, '#09f');
  gradient2.addColorStop(0.6, '#888');
  gradient2.addColorStop(0.9, '#09f');
  ctx.fillStyle = gradient2;
  ctx.fillRect(
    rectangleX + rectangleWidth,
    rectangleY,
    rectangleWidth,
    rectangleHeight
  );
  ctx.fillStyle = '#fff';
  ctx.font = '32px Symtext';
  ctx.fillText(
    '2 PLAYERS',
    $canvasHalfWidth + $canvasHalfWidth / 2,
    $height / 1.9
  );
}

//Rectangle Keyboards Variables
const keyboardsRectangleColor = 'transparent';
const keyboardRectanglesHeight = rectangleHeight + 80;
function keyboardRectangles() {
  const scaledWidth = 412 * 0.4;
  const scaledHeight = 270 * 0.4;

  const leftKeyboardX = (rectangleWidth - scaledWidth) / 2;
  const leftKeyboardY =
    $height -
    keyboardRectanglesHeight +
    (keyboardRectanglesHeight - scaledHeight) / 2;

  const rightKeyboardX = rectangleWidth + (rectangleWidth - scaledWidth) / 2;
  const rightKeyboardY =
    $height -
    keyboardRectanglesHeight +
    (keyboardRectanglesHeight - scaledHeight) / 2;

  ctx.fillStyle = keyboardsRectangleColor;
  ctx.fillRect(
    0,
    $height - keyboardRectanglesHeight,
    rectangleWidth,
    keyboardRectanglesHeight
  );
  ctx.fillRect(
    rectangleWidth,
    $height - keyboardRectanglesHeight,
    rectangleWidth,
    keyboardRectanglesHeight
  );

  ctx.save();
  ctx.scale(0.4, 0.4);
  ctx.drawImage(
    $imgKeyboardsLetters,
    0,
    0,
    412,
    270,
    leftKeyboardX / 0.4,
    leftKeyboardY / 0.4,
    412,
    270
  );
  ctx.restore();

  ctx.save();
  ctx.scale(0.4, 0.4);
  ctx.drawImage(
    $imgKeyboardsArrows,
    0,
    0,
    412,
    270,
    rightKeyboardX / 0.4,
    rightKeyboardY / 0.4,
    412,
    270
  );
  ctx.restore();
}

//Counter Variables
let playerLeftCounter = 0;
let playerRightCounter = 0;

function showCounter(playerLeftCounter, playerRightCounter) {
  //Counter Left
  ctx.fillStyle = '#fff';
  ctx.font = '55px Symtext';
  ctx.fillText(
    `${playerLeftCounter}`,
    $canvasHalfWidth - $canvasHalfWidth / 2,
    70
  );
  //Counter Right
  ctx.fillStyle = '#fff';
  ctx.font = '55px Symtext';
  ctx.fillText(
    `${playerRightCounter}`.toString(),
    $canvasHalfWidth + $canvasHalfWidth / 2,
    70
  );
}

//Paddle Variables
const paddleOffsetLeft = 20;
const paddleWidth = 10;
const paddleHeight = 46;
const paddleColor = '#fff';
//PaddleLeft
let paddleX = paddleOffsetLeft;
let paddleY = ($height - paddleHeight) / 2;
//PadleRight
let paddleXRight = $width - paddleOffsetLeft - paddleWidth;
let paddleYRight = ($height - paddleHeight) / 2;
//Keys Variables of PaddleLeft
let keyCapWpressed = false;
let keyCapSpressed = false;
//Keys Variables of paddLeRight
let keyCapArrowUp = false;
let keyCapArrowDown = false;

//Ball Variables
const ballWidth = paddleWidth;
const ballColor = paddleColor;
let ballX = $canvasHalfWidth;
let ballY = ($height - ballWidth) / 2;
let dirBallX = -3;
let dirBallY = -3;

function drawPaddleLeft() {
  ctx.fillStyle = paddleColor;
  ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
}

function drawPaddleRight() {
  ctx.fillStyle = paddleColor;
  ctx.fillRect(paddleXRight, paddleYRight, paddleWidth, paddleHeight);
}

function initKeyEvents() {
  document.addEventListener('keydown', ({ key }) => {
    if (key === 'W' || key === 'w') {
      keyCapWpressed = true;
    } else if (key === 'S' || key === 's') {
      keyCapSpressed = true;
    }

    if (key === 'ArrowUp') {
      keyCapArrowUp = true;
    } else if (key === 'ArrowDown') {
      keyCapArrowDown = true;
    }
  });

  document.addEventListener('keyup', ({ key }) => {
    if (key === 'W' || key === 'w') {
      keyCapWpressed = false;
    } else if (key === 'S' || key === 's') {
      keyCapSpressed = false;
    }

    if (key === 'ArrowUp') {
      keyCapArrowUp = false;
    } else if (key === 'ArrowDown') {
      keyCapArrowDown = false;
    }
  });

  document.addEventListener(
    'pointerdown',
    e => {
      if (e.target.matches('.bar-player1 .left-player-1')) {
        keyCapWpressed = true;
      } else if (e.target.matches('.bar-player1 .right-player-2')) {
        keyCapSpressed = true;
      }

      if (e.target.matches('.bar-player2 .left-player-1')) {
        keyCapArrowUp = true;
      } else if (e.target.matches('.bar-player2 .right-player-2')) {
        keyCapArrowDown = true;
      }
    },
    { passive: true }
  );

  document.addEventListener(
    'pointerup',
    e => {
      if (e.target.matches('.bar-player1 .left-player-1')) {
        keyCapWpressed = false;
      } else if (e.target.matches('.bar-player1 .right-player-2')) {
        keyCapSpressed = false;
      }

      if (e.target.matches('.bar-player2 .left-player-1')) {
        keyCapArrowUp = false;
      } else if (e.target.matches('.bar-player2 .right-player-2')) {
        keyCapArrowDown = false;
      }
    },
    { passive: true }
  );
}

function paddleLeftAndRightMovement() {
  if (keyCapWpressed && paddleY > 1) {
    paddleY -= 8;
  } else if (keyCapSpressed && paddleY < $height - paddleHeight - 1) {
    paddleY += 8;
  }

  if (keyCapArrowUp && paddleYRight > 1) {
    paddleYRight -= 8;
  } else if (keyCapArrowDown && paddleYRight < $height - paddleHeight - 1) {
    paddleYRight += 8;
  }
}

function generateDelayOfIA() {
  return [-1, -2, -3, -4, -1, -5][~~[Math.random() * 6]];
}

function paddleLeftAndRight_IA(delay) {
  if (keyCapWpressed && paddleY > 1) {
    paddleY -= 8;
  } else if (keyCapSpressed && paddleY < $height - paddleHeight - 1) {
    paddleY += 8;
  }
  paddleYRight = ballY + paddleHeight / delay;
}

function reseteo() {
  ballX = $canvasHalfWidth;
  ballY = ($height - ballWidth) / 2;
}

function drawBall() {
  ctx.fillStyle = ballColor;
  ctx.fillRect(ballX, ballY, ballWidth, ballWidth);
}

function ballMovement() {
  //Paddle Left
  let paddleTopRight = paddleX + paddleWidth;
  let paddleBottomLeft = paddleY + paddleHeight;
  //Paddle Right
  let paddleTopRight2 = paddleXRight + paddleWidth;
  let paddleBottomLeft2 = paddleYRight + paddleHeight;

  if (
    ballX < paddleTopRight - 1 &&
    ballX > paddleX &&
    ballY > paddleY &&
    ballY < paddleBottomLeft
    //If it bounces to the right of the left paddle
  ) {
    dirBallX = -dirBallX;
  } else if (
    ballX >= paddleX &&
    ballX <= paddleTopRight + 3 &&
    ballY === paddleY - ballWidth
  ) {
    // If it bounces to the top of the paddle left
    dirBallX = -dirBallX;
  } else if (
    ballX >= paddleX &&
    ballX <= paddleTopRight + 3 &&
    ballY === paddleBottomLeft
  ) {
    // If it bounces to the bottom of the paddle left
    dirBallX = -dirBallX;
  } else if (
    ballX + ballWidth < paddleTopRight2 - 1 &&
    ballX + ballWidth > paddleXRight &&
    ballY > paddleYRight &&
    ballY < paddleBottomLeft2
    //If it bounces to the left of the right paddle
  ) {
    dirBallX = -dirBallX;
  } else if (
    //If it bounces to the top of the right paddle
    ballX + ballWidth <= paddleXRight + ballWidth + 3 &&
    ballX + ballWidth >= paddleXRight - 3 &&
    ballY <= paddleYRight - ballWidth &&
    ballY >= paddleYRight - ballWidth - 3
  ) {
    // If it bounces to the top of the paddle right
    dirBallX = -dirBallX;
  } else if (
    ballX + ballWidth <= paddleXRight + ballWidth + 3 &&
    ballX + ballWidth >= paddleXRight - 3 &&
    ballY >= paddleYRight + ballWidth &&
    ballY <= paddleYRight + ballWidth + 3
  ) {
    // If it bounces to the bottom of the paddle right
    dirBallX = -dirBallX;
  } else if (ballY < 0) {
    //top total
    dirBallY = -dirBallY;
  } else if (ballY > $height - ballWidth) {
    //bottom total
    dirBallY = -dirBallY;
  } else if (ballX < 0) {
    //left total
    playerRightCounter++;
    showCounter(playerLeftCounter, playerRightCounter);
    delay = generateDelayOfIA();
    reseteo();
  } else if (ballX > $width - ballWidth) {
    //right total
    playerLeftCounter++;
    showCounter(playerLeftCounter, playerRightCounter);
    delay = generateDelayOfIA();
    reseteo();
  }
  ballX += dirBallX;
  ballY += dirBallY;
}

function backgroundBlackAndWhiteLines() {
  //Background black
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, $width, $height);
  //Lines in the center
  ctx.fillStyle = '#fff';
  const widthLine = 5;
  const heightLine = 20;
  const padding = 10;
  const rows = Math.floor($height / 25);

  for (let row = 0; row < rows; row++) {
    ctx.fillStyle = '#000';
    ctx.fillRect($canvasHalfWidth, row * 30, widthLine, padding);
    ctx.fillStyle = '#fff';
    ctx.fillRect($canvasHalfWidth, padding + row * 30, widthLine, heightLine);
  }
}

function PongTitle() {
  ctx.fillStyle = '#fff';
  ctx.font = '55px Pong';
  ctx.textAlign = 'center';
  ctx.fillText('PONG', $canvasHalfWidth / 2, 100);
  ctx.fillText('CLASSIC', $canvasHalfWidth + $canvasHalfWidth / 2, 100);
}

const clearBackground = () => ctx.clearRect(0, 0, $width, $height);

function gameOfTwoPlayers() {
  clearBackground();
  backgroundBlackAndWhiteLines();
  drawPaddleLeft();
  drawPaddleRight();
  drawBall();
  ballMovement();
  showCounter(playerLeftCounter, playerRightCounter);
  paddleLeftAndRightMovement();

  requestAnimationFrame(gameOfTwoPlayers);
}

function gameOnePlayer() {
  clearBackground();
  backgroundBlackAndWhiteLines();
  drawPaddleLeft();
  drawPaddleRight();
  drawBall();
  ballMovement();
  showCounter(playerLeftCounter, playerRightCounter);
  paddleLeftAndRight_IA(delay);

  requestAnimationFrame(gameOnePlayer);
}

document.addEventListener('DOMContentLoaded', () => {
  backgroundBlackAndWhiteLines();
  PongTitle();
  rectanglesPlayers();
  keyboardRectangles();
});

function handleRectangleClick(event) {
  const rect = $canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  if (
    mouseX >= 0 &&
    mouseX <= rectangleWidth &&
    mouseY >= 0 &&
    mouseY <= $height
  ) {
    initKeyEvents();
    document.querySelector('.bar-player2').classList.add('nascosto');
    gameOnePlayer(delay);
    $canvas.removeEventListener('click', handleRectangleClick);
  }

  if (
    mouseX >= rightRectangleX &&
    mouseX <= rightRectangleX + rectangleWidth &&
    mouseY >= 0 &&
    mouseY <= $height
  ) {
    initKeyEvents();
    document.querySelector('.bar-player2').classList.remove('nascosto');
    gameOfTwoPlayers();
    $canvas.removeEventListener('click', handleRectangleClick);
  }
}

$canvas.addEventListener('click', handleRectangleClick);
