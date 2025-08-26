document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("life-bg");
  const ctx = canvas.getContext("2d");

  const cellSize = 10;
  const updateEveryNFrames = 5;
  let frameCount = 0;
  let cols, rows;
  let grid, nextGrid;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / cellSize);
    rows = Math.floor(canvas.height / cellSize);
  }

  function init() {
    resize();
    grid = new Array(cols * rows).fill(false);
    nextGrid = new Array(cols * rows).fill(false);
    for (let i = 0; i < grid.length; i++) {
      grid[i] = Math.random() < 0.1;
    }
  }

  function getIndex(x, y) {
    return y * cols + x;
  }

  function countNeighbors(x, y) {
    let count = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        let nx = x + dx;
        let ny = y + dy;
        if (nx < 0) nx = cols - 1;
        else if (nx >= cols) nx = 0;
        if (ny < 0) ny = rows - 1;
        else if (ny >= rows) ny = 0;
        if (grid[getIndex(nx, ny)]) count++;
      }
    }
    return count;
  }

  function update() {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const idx = getIndex(x, y);
        const alive = grid[idx];
        const neighbors = countNeighbors(x, y);
        if (alive) {
          nextGrid[idx] = neighbors === 2 || neighbors === 3;
        } else {
          nextGrid[idx] = neighbors === 3;
        }
      }
    }
    [grid, nextGrid] = [nextGrid, grid];
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = " rgba(167, 110, 255, 0.4)";
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (grid[getIndex(x, y)]) {
          ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1);
        }
      }
    }
  }

  function loop() {
    frameCount++;
    if (frameCount % updateEveryNFrames === 0) {
      update();
      draw();
    }
    requestAnimationFrame(loop);
  }

  window.addEventListener("resize", () => {
    init();
  });

  init();
  loop();
});
