document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {}


function startGame () {
  // calls function to generate the game board
  generateBoard();
  
  // loops through cells array to get number of surrounding mines for each cell
  for(let i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  };

  // calls function to check for win conditions
  document.addEventListener("click",checkForWin);
  document.addEventListener("contextmenu",checkForWin);

  // gets board size
  let boardSizeRadios = document.getElementsByName('boardSize')
  for (let i = 0; i < boardSizeRadios.length; i++) {
    boardSizeRadios[i].addEventListener("click", resetBoard)
  }

  // gets difficulty
  let difficultyRadios = document.getElementsByName('difficulty')
  for (let i = 0; i < difficultyRadios.length; i++) {
    difficultyRadios[i].addEventListener("click", resetBoard)
  }

  // resets game board
  document.getElementById('reset').addEventListener("click",resetBoard);

  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// generates the game board
function generateBoard() {
  // creating variables
  board.cells = []
  boardSize = Number(document.querySelector('input[name="boardSize"]:checked').value)
  difficulty = getDifficulty()

  // creating cells
  for (i=0; i<boardSize; i++) {
    for(j=0; j<boardSize; j++) {
      board.cells.push({
        row: i,
        col: j,
        isMine: Math.random() < difficulty, 
        hidden: true
      })
    }
  }
}

// Reset the board function
function resetBoard() {
  // Remove existing board
  document.getElementsByClassName('board')[0].innerHTML = '';

  // Run the initial game setup again
  startGame()
}

// sets game difficulty
function getDifficulty() {
  // checks radio button selection
  radioSelect = document.querySelector('input[name="difficulty"]:checked').value

  // sets random seed based on radioSelect
  if(radioSelect == "hard"){
    return 0.66;
  } else if (radioSelect == "normal"){
    return 0.55;
  } else if (radioSelect == "easy"){
    return 0.33;
  } else {
    // if issue return default value
    return 0.55
  }
}

// function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  // creating local variables
  let isMineCount = 0;
  let isMarkedCount = 0;
  let isHiddenCount = 0;

  // looping through cells
  for(let i = 0; i < board.cells.length; i++){
    // counting number of mines
    if(board.cells[i].isMine){
      isMineCount++
    };
    // counting number of flaged squares
    if(board.cells[i].isMarked){
      isMarkedCount++
    }
    // counting number of hidden squares
    if(board.cells[i].hidden && !board.cells[i].isMine){
      isHiddenCount++
    }
  }
  // checking for win
  if( isMarkedCount == isMineCount && isHiddenCount == 0){
    lib.displayMessage('You win!')
  } 
}

// function to count the number of mines around the cell
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  let count = 0;
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  // console.log(surrounding);
  for(i = 0; i < surrounding.length; i++){
    if(surrounding[i].isMine){
      count++;
    }
  };
//  console.log('count for cell ' + cell.row + ',' + cell.col + ' is: ' + count);
  return count;
}

