const drawingCanvas = document.getElementById('drawing-canvas');
const targetPhoto = document.getElementById('target-photo');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score-display');
const ctx = drawingCanvas.getContext('2d');

let isDrawing = false;
let canDraw = false; // Game starts locked
let timeLeft = 30;
let gameInterval;

// Initialize Canvas
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 400, 400);

function startGame() {
    // 1. Reset Game State
    timeLeft = 30;
    canDraw = true;
    scoreDisplay.innerText = "Score: --";
    clearCanvas();
    
    // 2. Start Timer
    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `Time: ${timeLeft}s`;
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(gameInterval);
    canDraw = false;
    timerDisplay.innerText = "TIME'S UP!";
    calculateScore();
}

// THE GRADING ENGINE
function calculateScore() {
    // Create a temporary canvas to read the target image pixels
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 400;
    tempCanvas.height = 400;
    const tCtx = tempCanvas.getContext('2d');
    tCtx.drawImage(targetPhoto, 0, 0, 400, 400);

    const targetData = tCtx.getImageData(0, 0, 400, 400).data;
    const playerData = ctx.getImageData(0, 0, 400, 400).data;

    let totalDiff = 0;
    // Compare every 4th value (The Red channel is enough for black/white)
    for (let i = 0; i < targetData.length; i += 4) {
        let diff = Math.abs(targetData[i] - playerData[i]);
        totalDiff += diff;
    }

    // Calculate percentage (0 to 100)
    // 255 * pixels is the maximum possible difference
    const maxDiff = 255 * (targetData.length / 4);
    const score = Math.max(0, 100 - (totalDiff / maxDiff * 100));
    
    scoreDisplay.innerText = `Score: ${Math.floor(score)}%`;
}

// Update your drawing function to check 'canDraw'
function draw(e) {
    if (!isDrawing || !canDraw) return;

    const rect = drawingCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = 10; // Thicker lines help with scoring
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000000';

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    [lastX, lastY] = [x, y];
}

// ... Keep your startDrawing, stopDrawing, and clearCanvas functions from before ...
