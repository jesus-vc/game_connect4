//Current Player
let player = true;

//Create 'red' and 'blue' dot elements
const dotBlue = document.createElement("div");
dotBlue.className = "dot_blue";
const dotRed = document.createElement("div");
dotRed.className = "dot_red";

//Get document elements.
const form = document.querySelector("#myForm");
const width = document.querySelector('input[id="width"]');
const height = document.querySelector('input[id="height"]');
const button_reset = document.querySelector("#button_reset");

let columns = 0;
let elements = 0;
let square_heads = "";

// Generate array for board
let grid = [];

// Generate board dynamically.
const buildBoard = (columns, elements) => {
  const boardSection = document.createElement("section");
  boardSection.setAttribute("class", "board");

  for (let i = 0; i < columns; i++) {
    const boardColumnDiv = document.createElement("div");
    boardColumnDiv.setAttribute("class", "columns");
    boardColumnDiv.setAttribute("id", `${i + 1}`);

    const boardSquareHead = document.createElement("div");
    boardSquareHead.setAttribute("class", "square_head");

    boardColumnDiv.appendChild(boardSquareHead);

    for (let y = 0; y < elements; y++) {
      const boardSquares = document.createElement("div");
      boardSquares.setAttribute("class", "squares");
      boardColumnDiv.appendChild(boardSquares);
    }
    boardSection.appendChild(boardColumnDiv);
  }

  document.body.appendChild(boardSection);
};

const buildArray = (columns, elements) => {
  // Note: After performing testing, I switched from Map to Array as the JS data structure
  // to store and update this game more efficiently.
  // Specifically, it seems updating indexes of nested arrays inside a Map
  // requires updating the entire nested array. This was inefficient.

  // Previous Map Data Structure used:
  // const grid = new Map();
  // for (let i = 1; i < columns + 1; i++) {
  //   grid.set(i, Array(elements).fill(null));
  // }

  grid = Array.from({ length: columns }, () => Array(elements).fill(null));
};

//Calculate a match after every user selection.
const match = (column, index, player) => {
  let arr1 = [];

  //horizontal matches
  for (let i = 0; i < 4; i++) {
    for (let v = 3; v > -1; v--) {
      try {
        arr1.push(grid[column][index - v + i]);
      } catch (e) {
        arr1.push("undefined1");
      }
    }
    if (arr1.every((e) => e === player)) {
      return true;
    } else {
      arr1.splice(0, 4);
    }
  }

  //Top to bottom diagnol matches
  for (let i = 0; i < 4; i++) {
    for (let v = 3; v > -1; v--) {
      try {
        arr1.push(grid[column + v - i][index - v + i]);
      } catch (e) {
        arr1.push("undefine2");
      }
    }

    if (arr1.every((e) => e === player)) {
      return true;
    } else {
      arr1.splice(0, 4);
    }
  }

  //Bottom to top diagnol matches
  for (let i = 0; i < 4; i++) {
    for (let v = 3; v > -1; v--) {
      try {
        arr1.push(grid[column - v + i][index - v + i]);
      } catch (e) {
        arr1.push("undefined3");
      }
    }
    if (arr1.every((e) => e === player)) {
      return true;
    } else {
      arr1.splice(0, 4);
    }
  }

  //Verticle matches
  for (let i = 0; i < 4; i++) {
    for (let v = 3; v > -1; v--) {
      try {
        arr1.push(grid[column - v + i][index]);
      } catch (e) {
        arr1.push("undefined4");
      }
    }

    if (arr1.every((e) => e === player)) {
      return true;
    } else {
      arr1.splice(0, 4);
    }
  }
  return false;
};

//fill squares with dots as column is clicked.
const fillBoard = (e) => {
  const columnNumber = e.parentElement.id;
  const column = document.getElementById(`${columnNumber}`);

  // const indexSelected = grid[columnNumber - 1].findIndex((e) => e === null);
  const indexSelected = grid[columnNumber - 1].findLastIndex((e) => e === null);
  if (indexSelected !== -1) {
    //update grid
    grid[columnNumber - 1][indexSelected] = player;

    column.children[indexSelected + 1].appendChild(
      player === true ? dotBlue.cloneNode(true) : dotRed.cloneNode(true)
    );

    //Evaluate for match. Return "true" if match.
    const winner = match(columnNumber - 1, indexSelected, player);

    if (!grid.flat().some((e) => e === null)) {
      if (!winner) {
        endGameWithoutWinner();
      }
    }

    if (winner) {
      alert(`${player ? "Blue" : "Red"} player won!`);
      resetGame();
    }
    //update to next player
    player = !player;
  }
};

const resetGame = () => {
  document.querySelector("#button").disabled = false;
  [columns, elements] = [0, 0];
  grid = [];

  //Remove current table
  document.querySelector(".board").remove();
};

/** announce game end without a winner */
const endGameWithoutWinner = () => {
  alert("Game ended without winner. :-(");
  resetGame();
};

button_reset.addEventListener("click", resetGame);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  document.querySelector("#button").disabled = true;

  [columns, elements] = [parseInt(width.value, 10), parseInt(height.value, 10)];

  width.value = height.value = "";

  //Build HTML Board
  buildBoard(columns, elements);

  //Build nested array to track game
  buildArray(columns, elements);

  square_heads = document.querySelectorAll("div.square_head");

  //Add Event Listeners to each column's "head"
  square_heads.forEach((head) =>
    head.addEventListener("click", function () {
      fillBoard(head);
    })
  );
});
