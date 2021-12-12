/*
--- Day 9: Smoke Basin ---

These caves seem to be lava tubes. Parts are even still volcanically active; small hydrothermal vents release smoke into the caves that slowly settles like rain.

If you can model how the smoke flows through the caves, you might be able to avoid it and be that much safer. The submarine generates a heightmap of the floor of the nearby caves for you (your puzzle input).

Smoke flows to the lowest point of the area it's in. For example, consider the following heightmap:

2199943210
3987894921
9856789892
8767896789
9899965678

Each number corresponds to the height of a particular location, where 9 is the highest and 0 is the lowest a location can be.

Your first goal is to find the low points - the locations that are lower than any of its adjacent locations. Most locations have four adjacent locations (up, down, left, and right); locations on the edge or corner of the map have three or two adjacent locations, respectively. (Diagonal locations do not count as adjacent.)

In the above example, there are four low points, all highlighted: two are in the first row (a 1 and a 0), one is in the third row (a 5), and one is in the bottom row (also a 5). All other locations on the heightmap have some lower adjacent location, and so are not low points.

The risk level of a low point is 1 plus its height. In the above example, the risk levels of the low points are 2, 1, 6, and 6. The sum of the risk levels of all low points in the heightmap is therefore 15.

Find all of the low points on your heightmap. What is the sum of the risk levels of all low points on your heightmap?

--- Part Two ---

Next, you need to find the largest basins so you know what areas are most important to avoid.

A basin is all locations that eventually flow downward to a single low point. Therefore, every low point has a basin, although some basins are very small. Locations of height 9 do not count as being in any basin, and all other locations will always be part of exactly one basin.

The size of a basin is the number of locations within the basin, including the low point. The example above has four basins.

The top-left basin, size 3:

2199943210
3987894921
9856789892
8767896789
9899965678

The top-right basin, size 9:

2199943210
3987894921
9856789892
8767896789
9899965678

The middle basin, size 14:

2199943210
3987894921
9856789892
8767896789
9899965678

The bottom-right basin, size 9:

2199943210
3987894921
9856789892
8767896789
9899965678

Find the three largest basins and multiply their sizes together. In the above example, this is 9 * 14 * 9 = 1134.

What do you get if you multiply together the sizes of the three largest basins?
*/

let fs = require('fs');
let ps = require('process');

const MAX_HEIGHT : number = 9; 

class Point {
    x: number;
    y: number;
    value: number;

    constructor(x = 0, y = 0, value = 0) {
        this.x = x;
        this.y = y;
        this.value = value;
    }
};

function GetInputList(filename: string): number[][] {
    try {
        let data: string = fs.readFileSync(filename, 'utf8');
        let list = data.replace(/\r/g, "").split("\n").map(line => line.split('').map(iNum => parseInt(iNum)));
        return list;
    } catch (e) {
        console.log('Error:', e.stack);
    }
}

function FindLowPoints(heightmap: number[][]): Point[] {

    let lowPoints: Point[] = [];
    for (let y = 0; y < heightmap.length; y++) {
        for (let x = 0; x < heightmap[0].length; x++) {

            let value = (heightmap[y])[x];

            let up = y - 1 >= 0 ? (heightmap[y - 1])[x] : Number.MAX_SAFE_INTEGER;
            let down = y + 1 < heightmap.length ? (heightmap[y + 1])[x] : Number.MAX_SAFE_INTEGER;
            let left = x - 1 >= 0 ? (heightmap[y])[x - 1] : Number.MAX_SAFE_INTEGER;
            let right = x + 1 < heightmap[0].length ? (heightmap[y])[x + 1] : Number.MAX_SAFE_INTEGER;

            if (value < up && value < down && value < left && value < right) {
                lowPoints.push(new Point(x, y, value));
            }
        }
    }
    return lowPoints;
}

function CalculateRiskLevelSum(lowPoints: Point[]): number {
    return lowPoints.reduce(function (a, b) {
        return a + b.value + 1;
    }, 0);
}

function FloodFill4(x: number, y: number) {
    let total = 0;
    if (x >= 0 && x < (heightmap[0]).length && 
        y >= 0 && y < heightmap.length &&
        (heightmap[y])[x] < MAX_HEIGHT) {
        (heightmap[y])[x] = MAX_HEIGHT;
        total += 1;
        total += FloodFill4(x + 1, y);
        total += FloodFill4(x - 1, y);
        total += FloodFill4(x, y + 1);
        total += FloodFill4(x, y - 1);
    }
    return total;
}

function CalculateBasins(lowPoints: Point[]):number[] {
    let basins: number[] = [];
    lowPoints.map(point => {
        let basin = FloodFill4(point.x, point.y);
        basins.push(basin);
    })
    return basins;
}

function CalculateThreeBasins(basins: number[]): number {
    basins.sort((a, b) => b - a);
    return basins[0] * basins[1] * basins[2];
}

/*--- Part One ---*/
let heightmap = GetInputList(ps.cwd() + '\\data\\input.txt')
let lowPoints = FindLowPoints(heightmap);
let riskLevel = CalculateRiskLevelSum(lowPoints);
console.log("Risk level sum of low points: " + riskLevel);

/*--- Part Two ---*/
let basins = CalculateBasins(lowPoints);
let multiply = CalculateThreeBasins(basins);
console.log("Three largest basins multiply: " + multiply);