'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

let solver = new SudokuSolver;

module.exports = function (app) {

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {

    });

  app.route('/api/solve')
    .post((req, res) => {

      let puzzle = req.body.puzzle;
      if (!puzzle) {
        res.json({ error: 'Required field missing' });
        return;
      }
      else if (puzzle.length != 81) {
        res.json({ error: 'Expected puzzle to be 81 characters long' });
        return;
      }
      else if (puzzle.length != 81) {
        res.json({ error: 'Expected puzzle to be 81 characters long' });
        return;
      }
      else if (/[^0-9.]/g.test(puzzle)) {
        // Puzzle has characters other than 0-9 and .
        res.json({ error: 'Invalid characters in puzzle' });
        return;
      }

      let solvedPuzzle = solver.solve(puzzle);
      if (!solvedPuzzle) {
        // Unable to Solve
        res.json({ error: 'Puzzle cannot be solved' });
        return;
      }

      res.json({ solution: solvedPuzzle });

    });
};
