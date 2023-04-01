const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    const { puzzle, coordinate, value } = req.body;
    if (!puzzle || !coordinate || !value) {
      res.json({ error: "Required field(s) missing" });
      return;
    }
    const row = coordinate.split("")[ 0 ];
    const column = coordinate.split("")[ 1 ];
    console.log(`\n\n${coordinate}\n${row} and ${column}`)
    if (
      coordinate.length !== 2 ||
      !/[a-i]/i.test(row) ||
      !/[1-9]/.test(column)
    ) {
      console.log("invalid coordinate ");
      res.json({ error: "Invalid coordinate" });
      return;
    }
    console.log('Value: ', value)
    if (!/[1-9]/.test(value) || value > 9) {
      console.log('Invald VALUE')
      res.json({ error: "Invalid value" });
      return;
    }
    if (puzzle.length != 81) {
      console.log('Expected puzzle to be 81 characters long')
      res.json({ error: "Expected puzzle to be 81 characters long" });
      return;
    }
    if (/[^0-9.]/g.test(puzzle)) {
      console.log('Invalid characters in puzzle')
      res.json({ error: "Invalid characters in puzzle" });
      return;
    }
    let validCol = solver.checkColPlacement(puzzle, row, column, value);
    // console.log('\t\t\tHere')
    let validReg = solver.checkRegionPlacement(puzzle, row, column, value);
    let validRow = solver.checkRowPlacement(puzzle, row, column, value);
    let conflicts = [];
    if (validCol && validReg && validRow) {
      console.log('Valid: true');
      res.json({ valid: true });
      return;
    } else {
      if (!validRow) {
        conflicts.push("row");
      }
      if (!validCol) {
        conflicts.push("column");
      }
      if (!validReg) {
        conflicts.push("region");
      }
      console.log('Conflict')
      res.json({ valid: false, conflict: conflicts });
    }
  });

  app.route("/api/solve").post((req, res) => {
    const { puzzle } = req.body;
    if (!puzzle) {
      res.json({ error: "Required field missing" });
      return;
    }
    if (puzzle.length != 81) {
      res.json({ error: "Expected puzzle to be 81 characters long" });
      return;
    }
    if (/[^0-9.]/g.test(puzzle)) {
      res.json({ error: "Invalid characters in puzzle" });
      return;
    }
    let solvedString = solver.solve(puzzle);
    if (!solvedString) {
      res.json({ error: "Puzzle cannot be solved" });
    } else {
      res.json({ solution: solvedString });
    }
  });
};