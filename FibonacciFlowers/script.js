const ctx = document.getElementById('myCanvas').getContext('2d');
const state = {
  w: document.documentElement.clientWidth,
  h: document.documentElement.clientHeight,
  keyState: {},
  keys: {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    SPACE: 32,
  },
  frameCount: 0,
  mouseX: 0,
  mouseY: 0,
  mouseDown: false,
  score: 0,
  screen: null,
};

function init() {
  state.screen = new Screen();
  input();
  fit();
  frame();
}

function frame() {
  requestAnimationFrame(frame);
  fit();
  ctx.clearRect(0, 0, state.w, state.h);
  state.screen.update();
  state.screen.render();

  state.frameCount++;
}

function fit() {
  const dpr = window.devicePixelRatio;
  const { clientWidth, clientHeight } = document.documentElement;
  state.w = clientWidth * dpr;
  state.h = clientHeight * dpr;

  ctx.canvas.width = state.w;
  ctx.canvas.height = state.h;
  ctx.scale(dpr, dpr);
}

function input() {
  document.body.addEventListener('mousedown', () => {
    state.mouseDown = true;
  });

  document.body.addEventListener('mouseup', () => {
    state.mouseDown = false;
  });

  document.body.addEventListener('touchstart', () => {
    state.mouseDown = true
  });

  document.body.addEventListener('touchend', () => {
    state.mouseDown = false
  });

  document.body.addEventListener('mousemove', (event) => {
    state.mouseX = event.clientX;
    state.mouseY = event.clientY;
  });

  document.body.addEventListener('keydown', (event) => {
    state.keyState[event.keyCode] = true;
  });

  document.body.addEventListener('keyup', (event) => {
    delete state.keyState[event.keyCode];
  });
}

function renderCircle() {
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'orange';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(200, 200, 50, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function Screen() {
}

Screen.prototype.render = function () {
  ctx.fillStyle = '#555555'
  ctx.fillRect(0, 0, state.w, state.h);
  renderCircle();
}

Screen.prototype.update = () => {}

window.onload = init;
