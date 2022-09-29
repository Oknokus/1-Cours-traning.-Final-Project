const input = document.querySelector('.input')
const ball = document.getElementById('IBall');
const container = document.querySelector('div');
let platf1 = document.querySelector('.player1')
let platf2 = document.querySelector('.player2')
let platf1Speed = 5;
let platf2Speed = 5;
const check1 = document.getElementById('check1')
const check2 = document.getElementById('check2')
let check1Value = 0;
let check2Value = 0;
console.log(input)

//Положение платформы
platf1.style.top = container.offsetHeight / 2 - platf1.offsetHeight / 2 + 'px'
let platf1stTop = container.offsetHeight / 2 - platf1.offsetHeight / 2

platf2.style.top = container.offsetHeight / 2 - platf2.offsetHeight / 2 + 'px'
platf2.style.left = container.offsetWidth - platf2.offsetWidth + 'px'

//Положение мяча 
const ballLeft = container.offsetWidth / 2 - ball.offsetWidth / 2 + 'px'
const ballTop = container.offsetHeight / 2 - ball.offsetHeight / 2 + 'px'
ball.style.left = ballLeft;
ball.style.top = ballTop;

let posX = container.offsetWidth / 2 - ball.offsetWidth / 2;
let posY = container.offsetHeight / 2 - ball.offsetHeight / 2;
let timer = null;

let speedX = Math.round(Math.random()) * 2 || -Math.round(Math.random()) * 2;
let speedY = Math.round(Math.random())
if (speedY === 0) {
  speedY = -1
}


function start() {
  timer = requestAnimationFrame(moveBall)
}

function moveBall() {
    cancelAnimationFrame(timer)
    if (ball.offsetLeft + ball.offsetWidth === container.offsetWidth ||
      ball.offsetLeft === 0) {
      speedX = -speedX
  
    }
    if (ball.offsetTop + ball.offsetHeight === container.offsetHeight ||
      ball.offsetTop === 0) {
      speedY = -speedY;
    }
  
    posX += speedX;
    posY += speedY;
    ball.style.left = posX + 'px';
    ball.style.top = posY + 'px';
  
    let posPlatf1Top = platf1.offsetTop
    let posPlatf2Top = platf2.offsetTop
  
    if (ball.offsetLeft === platf1.offsetWidth && (ball.offsetTop >= posPlatf1Top - 40 && ball.offsetTop <= posPlatf1Top + 80)) {
      console.log('kick left');
      speedX = -speedX;
    } else if (ball.offsetLeft >= (container.offsetWidth - ball.offsetWidth)) {
      check1Value += 1;
      check1.innerHTML = check1Value;
    }
  
  
    if (ball.offsetLeft >= (container.offsetWidth - platf2.offsetWidth - ball.offsetWidth) && (ball.offsetTop >= posPlatf2Top - 40 && ball.offsetTop <= posPlatf2Top + 80)) {
      console.log('kick right')
      speedX = -speedX
    } else if (ball.offsetLeft <= 0) {
      check2Value += 1;
      check2.innerHTML = check2Value;
    }
    timer = requestAnimationFrame(moveBall)
  }




function Up__Down_traffic_play(e) {
  const resultHeight1 = platf1.offsetTop - platf1Speed;
  const resultBottom1 = platf1.offsetTop + platf1Speed;

  if (e.code === 'ShiftLeft' && resultHeight1 >= 0) {
    platf1.style.top = resultHeight1 + 'px';
  }

  if (e.code === 'ControlLeft' && resultBottom1 <= container.offsetHeight - platf1.offsetHeight) {
    platf1.style.top = resultBottom1 + 'px';
  }

  const resultHeight2 = platf2.offsetTop - platf2Speed;
  const resultBottom2 = platf2.offsetTop + platf2Speed;

  if (e.code === 'ShiftRight' && resultHeight2 >= 0) {
    platf2.style.top = resultHeight2 + 'px';
  }

  if (e.code === 'ControlRight' && resultBottom2 <= container.offsetHeight - platf1.offsetHeight) {
    platf2.style.top = resultBottom2 + 'px';
  }
}




document.addEventListener("keydown", Up__Down_traffic_play)
input.addEventListener('click', start)
