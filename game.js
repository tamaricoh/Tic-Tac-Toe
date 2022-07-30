//variables
let playertxt = document.querySelector("#player");
let restartBtn = document.querySelector("#reset");
let boxes = Array.from(document.getElementsByClassName("box")); // arr of cells

let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);

let someoneWons = false;
let clickingCounter = 0;
const O_player = "O";
const X_player = "X";

let currentPlayer = X_player;

let spaces = Array(9).fill(null); // if spaces[i] == null then the cell with id="i" is available

const winningCombinations = [
  // rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // diagonals
  [0, 4, 8],
  [2, 4, 6],
];

// variables - end

window.onload = startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
  // when a cell is clicked
};

function boxClicked(e) {
  const id = e.target.id;
  if (!spaces[id] & !someoneWons) {
    clickingCounter++;
    // if spaces[id] == null => this cell is available
    spaces[id] = currentPlayer; // spaces[id] == "X" or "O"
    e.target.innerText = currentPlayer; // puts "X" or "O" on HTML
    // check for winner
    if (clickingCounter > 4) {
      // in less steps - there is no winner
      let winningCombination = playerHasWon();
      if (winningCombination != false) {
        someoneWons = true;
        playertxt.innerText = `${currentPlayer} has won ! `; // prints who won
        winningCombination.map((e) => {
          // highlight winning combo
          boxes[e].style.backgroundColor = winnerIndicator;
          return;
        });
      } else if (clickingCounter == 9) playertxt.innerText = `it's a tie !`; // if no one has won
    }

    currentPlayer = currentPlayer == X_player ? O_player : X_player; // switch turns
  }
}

function playerHasWon() {
  // check for winning
  for (const condition of winningCombinations) {
    let [a, b, c] = condition;
    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}

restartBtn.addEventListener("click", restart);

function restart() {
  spaces.fill(null); // clear spaces
  boxes.forEach((box) => {
    // clear board
    box.innerText = "";
    box.style.backgroundColor = "";
  });
  playertxt.innerText = ""; // stop declare a winner
  someoneWons
    ? (currentPlayer = currentPlayer == X_player ? O_player : X_player)
    : (currentPlayer = X_player); // reset turns - winner will start next round
  someoneWons = false;
  clickingCounter = 0;
}
