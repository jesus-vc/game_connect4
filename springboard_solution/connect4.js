/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

// WIDTH represents # of nested arrays in the 'board' array.
// HEIGHT represents # of elements in one nested array
let WIDTH = 0;
let HEIGHT = 0;

//User input
const form = document.querySelector("#myForm");
const width_userInput = document.querySelector('input[id="width"]');
const height_userInput = document.querySelector('input[id="height"]');
const button_reset = document.querySelector("#button_reset");

// active player: 1 or 2
let currPlayer = 1;
// array of rows, each row is array of cells  (board[y][x])
let board = [];

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
const makeBoard = function makeBoardinJS() {
  board = Array.from({ length: HEIGHT }, () => Array(WIDTH).fill(null));
};

/** makeHtmlBoard: make HTML table and row of column tops. **/
const makeHtmlBoard = function makeboardinHTML() {
  const htmlBoard = document.getElementById("board");

  // Creates row of column tops with event listener to handle player clicking.
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }

  htmlBoard.append(top);

  // Dynamically creates rows based on global HEIGHT and WIDTH variables.
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
};

/** findSpotForCol: given column x, return top empty y (null if filled) */
const findSpotForCol = function findTopEmptySpotForEachColumn(cellIdClicked) {
  for (let i = HEIGHT - 1; i > -1; i--) {
    if (!document.getElementById(`${i}-${cellIdClicked}`).hasChildNodes()) {
      return i;
    }
  }
  return null;
};

/** placeInTable: update DOM to place piece into HTML table of board */
const placeInTable = (nextColumnSpot, cellIdClicked) => {
  // Creates new div
  const new_piece = document.createElement("div");

  new_piece.setAttribute("class", `piece ${currPlayer}`);

  // Inserts div into correct table cell.
  const cellToFill = document.getElementById(
    `${nextColumnSpot}-${cellIdClicked}`
  );

  cellToFill.append(new_piece);
};

/** endGame: announce game end without a winner */
const endGameWithoutWinner = () => {
  alert("Game ended without winner. :-(");
  resetGame();
};

/** handleClick: handle click of column top to play piece */
const handleClick = (evt) => {
  const cellIdClicked = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const nextColumnSpot = findSpotForCol(cellIdClicked);

  //if null, ignore click by returning.
  if (nextColumnSpot === null) {
    return;
  }

  // place piece in board and add to HTML table
  placeInTable(nextColumnSpot, cellIdClicked);
  board[nextColumnSpot][cellIdClicked] = currPlayer;

  /* Check for tie game
    - Check if any cell on board is still null
    - Run endGameWithoutWinner() if checkForWin() returns false. 
    
    Note on array  method chosen:
     - Array.some appears to be more optimal than using the array.every method proposed by Springboard,
     - given the some method stops processing during the first instance of a "null" value.
  */
  if (!board.flat().some((e) => e === null)) {
    if (!checkForWin()) {
      endGameWithoutWinner();
    }
  }

  // check for win and announce winner if there is one.
  if (checkForWin()) {
    alert(`Player ${currPlayer} won!`);
    resetGame();
  }
  // switch players
  currPlayer = currPlayer === 1 ? 2 : 1;
};

/** checkForWin: check board cell-by-cell for "does a win start here?" */
const checkForWin = () => {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  /****** Logic of for-loop ******
   * x and WIDTH represent # of nested arrays in the 'board' array.
   * y and HEIGHT represent # of elements in one nested array
   
   * For each iteration, the nested for-loop below constructs four arrays, each with 4 nested arrays. 
   * A nested array's first value [y,x] increaes by 1 for each interation.
   * The second, third, and fourth values increase by 1 as well on top of the hardcoded +1, +2, and +3
   * in order to capture cells across columns on the board.
  *******/

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      const vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      const diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      const diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
};

const resetGame = () => {
  document.querySelector("#button").disabled = false;
  [WIDTH, HEIGHT] = [0, 0];
  board = [];

  //Remove current table
  document.querySelector("#board").remove();

  //Create and append new table
  const new_table = document.createElement("table");
  new_table.setAttribute("id", "board");
  const new_row = document.createElement("tr");
  new_row.setAttribute("id", "column-top");

  new_table.append(new_row);

  document.querySelector("#game").append(new_table);
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  [WIDTH, HEIGHT] = [
    parseInt(width_userInput.value, 10),
    parseInt(height_userInput.value, 10),
  ];
  width_userInput.value = "";
  height_userInput.value = "";

  makeBoard();
  makeHtmlBoard();
  document.querySelector("#button").disabled = true;
});

button_reset.addEventListener("click", resetGame);

makeBoard();
makeHtmlBoard();
