// 1. The "Database"
const photoDatabase = [
  'assets/rad.jpg'
];

let targetImage = new Image();
let timer;
let timeLeft = 60; // seconds

// 2. Start the Game
function startGame() {
  const randomPhoto = photoDatabase[Math.floor(Math.random() * photoDatabase.length)];
  targetImage.src = randomPhoto;
  
  targetImage.onload = () => {
    displayTarget(targetImage);
    startTimer();
  };
}

// 3. The Grading Engine
function calculateScore() {
  const ctx = playerCanvas.getContext('2d');
  const playerData = ctx.getImageData(0, 0, 400, 400).data;
  
  // Create a hidden canvas to extract pixels from the target photo
  const targetData = getTargetPixels(targetImage);

  let diff = 0;
  for (let i = 0; i < playerData.length; i += 4) {
    // Compare Red, Green, and Blue channels
    diff += Math.abs(playerData[i] - targetData[i]);     // R
    diff += Math.abs(playerData[i+1] - targetData[i+1]); // G
    diff += Math.abs(playerData[i+2] - targetData[i+2]); // B
  }

  // Calculate percentage (total possible error is 255 * 3 * number of pixels)
  const totalPixels = 400 * 400;
  const score = 100 - (diff / (totalPixels * 3 * 255) * 100);
  
  alert(`Time's up! Your Accuracy: ${score.toFixed(2)}%`);
}