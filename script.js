// -------------------------------------------------------------------
// 1. GAME SETUP & CONFIGURATION
// -------------------------------------------------------------------
const drawingCanvas = document.getElementById('drawing-canvas');
const targetPhoto = document.getElementById('target-photo');
const ctx = drawingCanvas.getContext('2d');

// Game State Variables
let isDrawing = false; // Tracks if mouse button is held down
let lastX = 0; // Where the line started
let lastY = 0;

// Set the line style (Must be black, matching the prompt)
ctx.strokeStyle = '#000000'; // Pure Black
ctx.lineJoin = 'round'; // Smooths corners
ctx.lineCap = 'round'; // Smooths line ends
ctx.lineWidth = 5; // Default thickness

// -------------------------------------------------------------------
// 2. LOADING THE REFERENCE IMAGE
// -------------------------------------------------------------------

// For now, we will manually trigger this function when the page loads.
// Later, this will be tied to the "Start" button and pick a random image.
function loadReferenceImage() {
  const imageUrl = 'Bigtest/Assets/rad.jpg'; // Pointing to your test asset
  
  // Update the UI: Set the source of the <img> element
  targetPhoto.src = imageUrl;
  
  // Crucial: Clear the canvas with a SOLID WHITE background.
  // By default, canvas is transparent. Grading fails if one is transparent and one is white.
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, drawingCanvas.width, drawingCanvas.height);
}

// -------------------------------------------------------------------
// 3. THE DRAWING ENGINE (MOUSE TRACKING)
// -------------------------------------------------------------------

// Function to calculate mouse position relative to the canvas
function getMousePos(e) {
  const rect = drawingCanvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

// Starts the drawing line
function startDrawing(e) {
  isDrawing = true;
  // Grab the starting coordinates
  const { x, y } = getMousePos(e);
  [lastX, lastY] = [x, y];
}

// Continues the line as the mouse moves
function draw(e) {
  if (!isDrawing) return;

  // This ensures we are drawing exactly where the mouse is pointing
  const rect = drawingCanvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#000000';

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();

  [lastX, lastY] = [x, y];
  
  // Optional: Open your browser console (F12) to see if this pops up
  // console.log("Drawing at: ", x, y); 
}

// Stops the drawing action
function stopDrawing() {
  isDrawing = false;
}

// -------------------------------------------------------------------
// 4. PLAYER CONTROLS
// -------------------------------------------------------------------
function clearCanvas() {
  // Reset the canvas to blank white
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, drawingCanvas.width, drawingCanvas.height);
}

// -------------------------------------------------------------------
// 5. EVENT LISTENERS & INITIALIZATION
// -------------------------------------------------------------------

// Monitor the mouse actions ON THE CANVAS
drawingCanvas.addEventListener('mousedown', startDrawing);
drawingCanvas.addEventListener('mousemove', draw);
drawingCanvas.addEventListener('mouseup', stopDrawing);
drawingCanvas.addEventListener('mouseout', stopDrawing); // Stops drawing if mouse leaves canvas

// Start the sequence! When the page loads, prepare the environment.
// Load the specific image first to test the UI link.
window.onload = loadReferenceImage;
