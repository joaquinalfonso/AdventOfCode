/*
--- Day 5: Hydrothermal Venture ---

You come across a field of hydrothermal vents on the ocean floor! These vents constantly produce large, opaque clouds, so it would be best to avoid them if possible.

They tend to form in lines; the submarine helpfully produces a list of nearby lines of vents (your puzzle input) for you to review. For example:

0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2

Each line of vents is given as a line segment in the format x1,y1 -> x2,y2 where x1,y1 are the coordinates of one end the line segment and x2,y2 are the coordinates of the other end. These line segments include the points at both ends. In other words:

An entry like 1,1 -> 1,3 covers points 1,1, 1,2, and 1,3.
An entry like 9,7 -> 7,7 covers points 9,7, 8,7, and 7,7.
For now, only consider horizontal and vertical lines: lines where either x1 = x2 or y1 = y2.

So, the horizontal and vertical lines from the above list would produce the following diagram:

.......1..
..1....1..
..1....1..
.......1..
.112111211
..........
..........
..........
..........
222111....

In this diagram, the top left corner is 0,0 and the bottom right corner is 9,9. Each position is shown as the number of lines which cover that point or . if no line covers that point. The top-left pair of 1s, for example, comes from 2,2 -> 2,1; the very bottom row is formed by the overlapping lines 0,9 -> 5,9 and 0,9 -> 2,9.

To avoid the most dangerous areas, you need to determine the number of points where at least two lines overlap. In the above example, this is anywhere in the diagram with a 2 or larger - a total of 5 points.

Consider only horizontal and vertical lines. At how many points do at least two lines overlap?

Your puzzle answer was 3990.

--- Part Two ---

Unfortunately, considering only horizontal and vertical lines doesn't give you the full picture; you need to also consider diagonal lines.

Because of the limits of the hydrothermal vent mapping system, the lines in your list will only ever be horizontal, vertical, or a diagonal line at exactly 45 degrees. In other words:

An entry like 1,1 -> 3,3 covers points 1,1, 2,2, and 3,3.
An entry like 9,7 -> 7,9 covers points 9,7, 8,8, and 7,9.
Considering all lines from the above example would now produce the following diagram:

1.1....11.
.111...2..
..2.1.111.
...1.2.2..
.112313211
...1.2....
..1...1...
.1.....1..
1.......1.
222111....

You still need to determine the number of points where at least two lines overlap. In the above example, this is still anywhere in the diagram with a 2 or larger - now a total of 12 points.

Consider all of the lines. At how many points do at least two lines overlap?
*/

let fs = require('fs');
let ps = require('process');

class Dot {
    x: number;
    y: number;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    ToString() {
        return this.x.toString() + "," + this.y.toString();
    }
};

class Line {
    start: Dot;
    end: Dot;

    constructor(start: Dot, end: Dot) {
        this.start = start;
        this.end = end;
    }

    IsHorizontalOrVertical(): boolean {
        return this.start.x === this.end.x || this.start.y === this.end.y;
    }

    GetDots() {
        var directionX = this.start.x < this.end.x ? 1 : this.start.x > this.end.x ? -1 : 0;
        var directionY = this.start.y < this.end.y ? 1 : this.start.y > this.end.y ? -1 : 0;
        var dots: Dot[] = [];

        var iterate = new Dot(this.start.x, this.start.y);

        while (iterate.x != this.end.x || iterate.y != this.end.y) {
            dots.push(new Dot(iterate.x, iterate.y));
            iterate.x += directionX;
            iterate.y += directionY;
        }
        dots.push(this.end);
        return dots;
    }
};

function GetInputList(filename: string): string[] {
    try {
        let data:string = fs.readFileSync(filename, 'utf8');
        let list = data.split("\n").map(line => line.replace(/\n|\r/g, ""));
        return list;
    } catch (e) {
        console.log('Error:', e.stack);
        return [];
    }
}

function ParseLine(line: string): Line {
    let lineDots = line.split("->").map(line => line.replace(/\s/g, "").split(",").map(iNum => parseInt(iNum)));

    let startDot = new Dot((lineDots[0])[0], (lineDots[0])[1]);
    let endDot = new Dot((lineDots[1])[0], (lineDots[1])[1]);
    let result = new Line(startDot, endDot);
    return result;
}

function MarkDotOnBoard(map: Map<string, number>, dot: Dot) {
    let dotAsString = dot.ToString();
    if (!map.has(dotAsString)) {
        map.set(dotAsString, 0);
    }
    let dotValue = map.get(dotAsString);
    map.set(dotAsString, ++dotValue);
}

function ProcessLines(lines: string[], allLines: boolean): Map<string, number> {
    let board = new Map<string, number>();
    lines.forEach(lineString => {
        let line = ParseLine(lineString);
        if ((line.IsHorizontalOrVertical() && !allLines) || allLines) {
            line.GetDots().forEach(dot => {
                MarkDotOnBoard(board, dot);
            });
        }
    });
    return board;
}

/* --- Part One --- */ 
let inputList = GetInputList(ps.cwd() + '\\input.txt')
let board = ProcessLines(inputList, false);
let total = 0;
board.forEach((value: number, key: string) => {
    if (value > 1) {
        total++;
    }
});
console.log("Horizontal and vertical lines points overlap: " + total);

/* --- Part Two --- */ 
board = ProcessLines(inputList, true);
total = 0;
board.forEach((value: number, key: string) => {
    if (value > 1) {
        total++;
    }
});
console.log("All lines points overlap: " + total);