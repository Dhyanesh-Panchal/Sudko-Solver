class SudokuSolver {

  board = []

  validate(puzzleString) {
  }

  checkRowPlacement(board, row, col, value) {
    for (let i = 0; i < 9; i++) {
      if (board[ row ][ i ] == value)
        return false;
    }
    return true;
  }

  checkColPlacement(board, row, col, value) {
    for (let i = 0; i < 9; i++) {
      if (board[ i ][ col ] == value)
        return false;
    }
    return true;
  }

  checkRegionPlacement(board, row, col, value) {
    let r = Math.floor(row / 3) * 3;
    let c = Math.floor(col / 3) * 3;
    for (let i = r; i < r + 3; i++) {
      for (let j = c; j < c + 3; j++) {
        if (board[ i ][ j ] == value)
          return false;
      }
    }
    return true;
  }

  isSafe(board, row, col, value) {
    if (this.checkRowPlacement(board, row, col, value) && this.checkColPlacement(board, row, col, value) && this.checkRegionPlacement(board, row, col, value))
      return true;
    else
      return false;
  }

  recSolv(board, row, col) {

    if (row == board.length) {
      return true;
    }
    let newrow, newcol;
    if (col != board.length - 1) {
      newrow = row;
      newcol = col + 1;
    } else {
      newrow = row + 1;
      newcol = 0;
    }

    if (board[ row ][ col ] != '.') {
      if (this.recSolv(this.board, newrow, newcol)) {
        return true;
      }
    }
    else {
      for (let i = 1; i <= 9; i++) {
        //Number is Safe to fit
        if (this.isSafe(board, row, col, i)) {
          this.board[ row ][ col ] = `${i}`;
          if (this.recSolv(this.board, newrow, newcol)) {
            return true;
          }
          else {
            this.board[ row ][ col ] = `.`;
          }
        }
      }
    }
    return false;
  }

  solve(puzzle) {
    // let board = [];
    //CONVERTING STRING INTO GRID 
    for (let i = 0; i < 81; i += 9) {
      this.board.push((puzzle.slice(i, i + 9)).split(''))
      console.log(this.board)
    }

    if (this.recSolv(this.board, 0, 0)) {
      console.log(this.board)
    }

  }
}

let solver = new SudokuSolver;
solver.solve('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.');

module.exports = SudokuSolver;

