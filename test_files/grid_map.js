const grid = new Map([
  [1, ["I", "B", "S", ":-)", "B", "7", "99"]],
  [2, ["B", "A", "S", "ssa", "B", "B", "R"]],
  [3, ["B", "B", "M", "ads", "x", "B", "R"]],
  [4, ["R", "R", "R", "R", "B", "Bs", "B"]],
  [5, [false, false, true, true, true, true, "R"]],
  [6, ["B", "L", "L", "B", "B", "B", "B"]],
  [7, ["uio", "R", "U", "R", "B", "B", "B"]],
]);

// Create Board
const mapSize = [7, 6]; //todo - refactor to get user's input.
const [columns, elements] = mapSize;

// const grid = new Map();
// for (let i = 1; i < columns + 1; i++) {
//   grid.set(i, Array(elements).fill(null));
//   //create html elements here for board?
// }

// Search for match after each user selection
const selection_co = 5;
const selection_index = 3;
const player = true;

const match = (column, index, player) => {
  let arr1 = [];

  //horizontal matches
  for (let i = 0; i < 4; i++) {
    for (let v = 3; v > -1; v--) {
      //   arr1.push(grid.get(column)[index - v + i]);
      try {
        arr1.push(grid.get(column)[index - v + i]);
      } catch (e) {
        arr1.push("undefined1");
      }
    }
    console.log("1");
    console.log(arr1);
    if (arr1.every((e) => e === player)) {
      console.log("match. DONE");
      arr1.splice(0, 4);
    } else {
      arr1.splice(0, 4);
    }
  }

  //Top to bottom diagnol matches
  for (let i = 0; i < 4; i++) {
    for (let v = 3; v > -1; v--) {
      //   arr1.push(grid.get(column + v - i)[index - v + i]);
      try {
        arr1.push(grid.get(column + v - i)[index - v + i]);
      } catch (e) {
        arr1.push("undefine2");
      }
    }
    console.log("2");
    console.log(arr1);
    if (arr1.every((e) => e === player)) {
      console.log("match. DONE");
      arr1.splice(0, 4);
    } else {
      arr1.splice(0, 4);
    }
  }

  //Bottom to top diagnol matches
  for (let i = 0; i < 4; i++) {
    for (let v = 3; v > -1; v--) {
      //   arr1.push(grid.get(column - v + i)[index - v + i]);

      try {
        arr1.push(grid.get(column - v + i)[index - v + i]);
      } catch (e) {
        arr1.push("undefined3");
      }
    }
    console.log("3");
    console.log(arr1);
    if (arr1.every((e) => e === player)) {
      console.log("match. DONE");
      arr1.splice(0, 4);
    } else {
      arr1.splice(0, 4);
    }
  }

  //Verticle matches
  for (let i = 0; i < 4; i++) {
    //runs 4 times

    for (let v = 3; v > -1; v--) {
      //runs 4 times
      //   arr1.push(grid.get(column - v + i)[index]);
      try {
        arr1.push(grid.get(column - v + i)[index]);
      } catch (e) {
        //console.log(e);
        arr1.push("undefined4");
      }
    }
    console.log("4");
    console.log(arr1);
    if (arr1.every((e) => e === player)) {
      console.log("match. DONE");
      arr1.splice(0, 4);
    } else {
      arr1.splice(0, 4);
    }
  }
};

match(selection_co, selection_index, player);
