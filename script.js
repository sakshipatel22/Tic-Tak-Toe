// Select all necessary DOM elements
let boxes = document.querySelectorAll(".box");
let btn = document.querySelector("#restart");
let newBtn = document.querySelector("#new-btn");
let msgCont = document.querySelector(".msg-cont");
let msg = document.querySelector("#msg");

// Variables to manage the game state
let playerO = true; // Start with player O
let moves = 0; // Track the number of moves made

// Winning conditions array
const winningConditions = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

// Reset the game to its initial state
const resetGame = () => {
  playerO = true;
  moves = 0;
  enableBoxes(); // Enable all boxes
  msgCont.classList.add("hide"); // Hide the message container
};

// Add event listeners to each box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // Check if the box is already clicked (redundant due to disabling)
    if (box.innerText !== "") return;

    // Set the box's text based on the current player
    box.innerText = playerO ? "O" : "X";
    playerO = !playerO; // Toggle the player
    box.disabled = true; // Disable the box after it's clicked
    moves++; // Increment the move counter

    // Check for a winner
    checkWinner();
    
    // If all boxes are filled and no winner, it's a draw
    if (moves === 9 && !msgCont.classList.contains("hide")) {
      showDraw();
    }
  });
});

// Disable all boxes (used when a winner is declared)
const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

// Enable all boxes and reset their text
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

// Show the winner message and disable the game
const showWinner = (winner) => {
  msg.innerText = `Congratulations, the winner is ${winner}!`;
  msgCont.classList.remove("hide"); // Show the message container
  disableBoxes(); // Disable all boxes
};

// Show draw message
const showDraw = () => {
  msg.innerText = "It's a draw!";
  msgCont.classList.remove("hide");
  disableBoxes(); // Disable all boxes
};

// Check if there's a winner
const checkWinner = () => {
  for (let pattern of winningConditions) {
    let [pos1, pos2, pos3] = [boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText];

    // Check if all positions in the pattern are filled and match
    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      showWinner(pos1); // Declare the winner
      return;
    }
  }
};

// Event listeners for reset buttons
newBtn.addEventListener("click", resetGame);
btn.addEventListener("click", resetGame);
