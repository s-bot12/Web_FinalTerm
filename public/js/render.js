var canvas = document.getElementById('board');
var ctx = canvas.getContext('2d');
var W = 300, H = 600;
var BLOCK_W = W / COLS, BLOCK_H = H / ROWS;
var NBLOCK_W = 20, NBLOCK_H = 20;

var nextcanvas = document.getElementById('next');
var nextctx = nextcanvas.getContext('2d');

function drawNext() {
    nextctx.clearRect(0, 0, 100, 100);

    nextctx.fillStyle = 'red';
    nextctx.strokeStyle = 'white';
    for (var y = 0; y < 4; ++y) {
        for (var x = 0; x < 4; ++x) {
            if (next[y][x]) {
                nextctx.fillStyle = colors[next[y][x] - 1];
                nextctx.fillRect(10 + NBLOCK_W * x, 30 + NBLOCK_H * y, NBLOCK_W - 1, NBLOCK_H - 1);
                nextctx.strokeRect(10 + NBLOCK_W * x, 30 + NBLOCK_H * y, NBLOCK_W - 1, NBLOCK_H - 1);
            }
        }
    }
}

function drawGameOver() {
    ctx.fillStyle = 'black';
    ctx.fillRect(50, H / 2 - 40, 200, 60);
    ctx.font = "30px Arial";
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', W / 2, H / 2);
}

// draw a single square at (x, y)
function drawBlock(x, y) {
    ctx.fillRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
    ctx.strokeRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
}

// draws the board and the moving shape
function render() {
    ctx.clearRect(0, 0, W, H);

    ctx.strokeStyle = 'white';
    for (var x = 0; x < COLS; ++x) {
        for (var y = 0; y < ROWS; ++y) {
            if (board[y][x]) {
                ctx.fillStyle = colors[board[y][x] - 1];
                drawBlock(x, y);
            }
        }
    }

    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'white';
    for (var y = 0; y < 4; ++y) {
        for (var x = 0; x < 4; ++x) {
            if (current[y][x]) {
                ctx.fillStyle = colors[current[y][x] - 1];
                drawBlock(currentX + x, currentY + y);
            }
        }
    }
}