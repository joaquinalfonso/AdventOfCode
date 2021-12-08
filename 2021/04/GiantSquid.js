/*
--- Day 4: Giant Squid ---
You're already almost 1.5km (almost a mile) below the surface of the ocean, already so deep that you can't see any sunlight. What you can see, however, is a giant squid that has attached itself to the outside of your submarine.

Maybe it wants to play bingo?

Bingo is played on a set of boards each consisting of a 5x5 grid of numbers. Numbers are chosen at random, and the chosen number is marked on all boards on which it appears. (Numbers may not appear on all boards.) If all numbers in any row or any column of a board are marked, that board wins. (Diagonals don't count.)

The submarine has a bingo subsystem to help passengers (currently, you and the giant squid) pass the time. It automatically generates a random order in which to draw numbers and a random set of boards (your puzzle input). For example:

7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7

After the first five numbers are drawn (7, 4, 9, 5, and 11), there are no winners, but the boards are marked as follows (shown here adjacent to each other to save space):

22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
 8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
 6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
 1 12 20 15 19        14 21 16 12  6         2  0 12  3  7

After the next six numbers are drawn (17, 23, 2, 0, 14, and 21), there are still no winners:

22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
 8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
 6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
 1 12 20 15 19        14 21 16 12  6         2  0 12  3  7

Finally, 24 is drawn:

22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
 8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
 6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
 1 12 20 15 19        14 21 16 12  6         2  0 12  3  7

At this point, the third board wins because it has at least one complete row or column of marked numbers (in this case, the entire top row is marked: 14 21 17 24 4).

The score of the winning board can now be calculated. Start by finding the sum of all unmarked numbers on that board; in this case, the sum is 188. Then, multiply that sum by the number that was just called when the board won, 24, to get the final score, 188 * 24 = 4512.

To guarantee victory against the giant squid, figure out which board will win first. What will your final score be if you choose that board?

--- Part Two ---

On the other hand, it might be wise to try a different strategy: let the giant squid win.

You aren't sure how many bingo boards a giant squid could play at once, so rather than waste time counting its arms, the safe thing to do is to figure out which board will win last and choose that one. That way, no matter which boards it picks, it will win for sure.

In the above example, the second board is the last to win, which happens after 13 is eventually called and its middle column is completely marked. If you were to keep playing until this point, the second board would have a sum of unmarked numbers equal to 148 for a final score of 148 * 13 = 1924.

Figure out which board will win last. Once it wins, what would its final score be?
*/

let fs = require('fs');
let ps = require('process');

const BOARD_SIZE = 5;

function GetInputList(filename) {
    try {
        let data = fs.readFileSync(filename, 'utf8');
        let list = data.split("\n").map(line => line.replace(/\n|\r/g, ""));
        return list;
    } catch (e) {
        console.log('Error:', e.stack);
    }
}

function GetDrawnNumbersSequence(inputList) {
    return inputList[0].split(",").map(iNum => parseInt(iNum));
}

function GetBoards(inputList) {
    let rows = inputList.length;
    let row = 2;
    let boards = [];
    while (row < rows) {
        let subset = inputList.slice(row, row + BOARD_SIZE);
        boards.push(GetBoard(subset));
        row += BOARD_SIZE + 1;
    }
    console.log("Boards: " + boards.length);
    return boards;
}

function GetBoard(rows) {
    let numbers = [];
    let matches = [];
    rows.forEach(row => {
        let a = row.split(' ').filter(item => item.length > 0 ? true : false).map(iNum => parseInt(iNum));
        numbers.push(a);
        matches.push(new Array(BOARD_SIZE).fill(false));
    });
    return {
        numbers: numbers,
        matches: matches
    }
}

function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
        return ele != value;
    });
}

function PlayBingo(drawnNumbersSequence, boards) {
    let winnerBoardsSortedList = [];
    for (let i = 0; i < drawnNumbersSequence.length; i++) {
        let drawnNumber = drawnNumbersSequence[i];
        MarkBoards(drawnNumber, boards);
        let winnerBoards = CheckBoards(boards);
        if (winnerBoards.length > 0) {
            winnerBoards.forEach(board => {
                winnerBoardsSortedList.push({
                    lastNumber: drawnNumber,
                    board: board
                });
                boards = arrayRemove(boards, board);
            })
        }
    }
    return winnerBoardsSortedList;
}

function MarkBoards(drawnNumber, boards) {
    boards.forEach(board => {
        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                if ((board.numbers[i])[j] === drawnNumber) {
                    (board.matches[i])[j] = true;
                }
            }
        }
    });
}

function CheckBoards(boards) {
    let winnerBoards = [];
    for (let b = 0; b < boards.length; b++) {
        let board = boards[b];
        for (let i = 0; i < BOARD_SIZE; i++) {
            //Check rows
            if (board.matches[i].filter(e => e === true).length === BOARD_SIZE) {
                winnerBoards.push(board);
                break;
            }
            //Check columns
            let totalRow = 0;
            for (let j = 0; j < BOARD_SIZE; j++) {
                totalRow += (board.matches[j])[i] === true ? 1 : 0;
            }
            if (totalRow === BOARD_SIZE) {
                winnerBoards.push(board);
                break;
            }
        }
    }
    return winnerBoards;
}

function CalculateBoard(board) {
    let total = 0;
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            if ((board.matches[i])[j] === false) {
                total += (board.numbers[i])[j];
            }
        }
    }
    return total;
}

let inputList = GetInputList(ps.cwd() + '\\input.txt')
let drawnNumbersSequence = GetDrawnNumbersSequence(inputList);
let boards = GetBoards(inputList);
let winnerBoards = PlayBingo(drawnNumbersSequence, boards);

let bestBoard = winnerBoards[0];
let sumNotMatches = CalculateBoard(bestBoard.board);
console.log("Best board: Last drawn: " + bestBoard.lastNumber +
    " Board Sum: " + sumNotMatches +
    " Final Score: " + bestBoard.lastNumber * sumNotMatches);

let worstBoard = winnerBoards[winnerBoards.length - 1];
let sumWorst = CalculateBoard(worstBoard.board);
console.log("Worst board: Last drawn: " + worstBoard.lastNumber +
    " Board Sum: " + sumWorst +
    " Final Score: " + worstBoard.lastNumber * sumWorst);
