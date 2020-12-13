/*

--- Day 3: Crossed Wires ---

The gravity assist was successful, and you're well on your way to the Venus refuelling station. During the rush back on Earth, the fuel management system wasn't completely installed, so that's next on the priority list.
Opening the front panel reveals a jumble of wires. Specifically, two wires are connected to a central port and extend outward on a grid. You trace the path each wire takes as it leaves the central port, one wire per line of text (your puzzle input).
The wires twist and turn, but the two wires occasionally cross paths. To fix the circuit, you need to find the intersection point closest to the central port. Because the wires are on a grid, use the Manhattan distance for this measurement. While the wires do technically cross right at the central port where they both start, this point does not count, nor does a wire count as crossing with itself.
For example, if the first wire's path is R8,U5,L5,D3, then starting from the central port (o), it goes right 8, up 5, left 5, and finally down 3:

...........
...........
...........
....+----+.
....|....|.
....|....|.
....|....|.
.........|.
.o-------+.
...........

Then, if the second wire's path is U7,R6,D4,L4, it goes up 7, right 6, down 4, and left 4:

...........
.+-----+...
.|.....|...
.|..+--X-+.
.|..|..|.|.
.|.-X--+.|.
.|..|....|.
.|.......|.
.o-------+.
...........

These wires cross at two locations (marked X), but the lower-left one is closer to the central port: its distance is 3 + 3 = 6.

Here are a few more examples:

R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83 = distance 159
R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7 = distance 135

What is the Manhattan distance from the central port to the closest intersection?

--- Part Two ---

It turns out that this circuit is very timing-sensitive; you actually need to minimize the signal delay.
To do this, calculate the number of steps each wire takes to reach each intersection; choose the intersection where the sum of both wires' steps is lowest. If a wire visits a position on the grid multiple times, use the steps value from the first time it visits that position when calculating the total value of a specific intersection.
The number of steps a wire takes is the total number of grid squares the wire has entered to get to that location, including the intersection being considered. Again consider the example from above:

...........
.+-----+...
.|.....|...
.|..+--X-+.
.|..|..|.|.
.|.-X--+.|.
.|..|....|.
.|.......|.
.o-------+.
...........

In the above example, the intersection closest to the central port is reached after 8+5+5+2 = 20 steps by the first wire and 7+6+4+3 = 20 steps by the second wire for a total of 20+20 = 40 steps.
However, the top-right intersection is better: the first wire takes only 8+5+2 = 15 and the second wire takes only 7+6+2 = 15, a total of 15+15 = 30 steps.

Here are the best steps for the extra examples from above:

R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83 = 610 steps
R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7 = 410 steps

What is the fewest combined steps the wires must take to reach an intersection?

*/

package main

import (
	"fmt"
	"io/ioutil"
	"regexp"
	"strconv"
	"strings"
)

const MOVE_RIGHT string = "R"
const MOVE_LEFT string = "L"
const MOVE_UP string = "U"
const MOVE_DOWN string = "D"

const MaxUint = ^uint(0)
const MaxInt = int(MaxUint >> 1)

var CommandRegex, _ = regexp.Compile("(\\w)(\\d+)")

type Coordinate struct {
	x int
	y int
}

type WirePath struct {
	maps map[Coordinate]int
}

type Command struct {
	direction string
	size      int
}

func GetCommand(move string) Command {
	parts := CommandRegex.FindStringSubmatch(move)
	direction := parts[1]
	size, _ := strconv.Atoi(parts[2])
	command := Command{
		direction: direction,
		size:      size,
	}
	return command
}

func GetSteps(stepsList string) WirePath {
	var moves = strings.Split(stepsList, ",")

	path := WirePath{}
	path.maps = make(map[Coordinate]int)

	position := Coordinate{
		x: 0,
		y: 0,
	}
	var step int = 0
	for i := 0; i < len(moves); i++ {
		move := moves[i]

		command := GetCommand(move)

		for x := 1; x <= command.size; x++ {
			if command.direction == MOVE_RIGHT {
				position.x++
			}
			if command.direction == MOVE_LEFT {
				position.x--
			}
			if command.direction == MOVE_UP {
				position.y++
			}
			if command.direction == MOVE_DOWN {
				position.y--
			}
			newPosition := Coordinate{
				x: position.x,
				y: position.y,
			}
			step++
			path.maps[newPosition] = step
		}
	}

	return path
}

func GetWiresPath(inputFileName string) []WirePath {
	data, err := ioutil.ReadFile(inputFileName)
	if err != nil {
		fmt.Println("File reading error", err)
		panic("File reading error")
	}
	var moves = strings.Split(string(data), "\n")

	var wire1Steps = GetSteps(moves[0])
	var wire2Steps = GetSteps(moves[1])

	return []WirePath{wire1Steps, wire2Steps}
}

func GetMinDistance(wire1Steps, wire2Steps WirePath) int {
	minDistance := MaxInt

	for coordinate := range wire1Steps.maps {
		_, exists := wire2Steps.maps[coordinate]
		if exists {
			distance := GetManhattanDistance(coordinate)
			if distance < minDistance {
				minDistance = distance
			}
			fmt.Printf("Match [%d,%d] Distance %d\n", coordinate.x, coordinate.y, distance)
		}
	}
	return minDistance
}

func GetMinSteps(wire1Steps, wire2Steps WirePath) int {
	minSteps := MaxInt

	for coordinate, steps1 := range wire1Steps.maps {
		steps2, exists := wire2Steps.maps[coordinate]
		if exists {
			totalSteps := steps1 + steps2
			if totalSteps < minSteps {
				minSteps = totalSteps
			}
			fmt.Printf("Steps [%d + %d] Total %d\n", steps1, steps2, steps1+steps2)
		}
	}
	return minSteps
}

func Abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func GetManhattanDistance(coordinate Coordinate) int {
	return int(Abs(coordinate.x) + Abs(coordinate.y))
}

func main() {
	var inputFileName = "input.txt"
	var wiresPaths = GetWiresPath(inputFileName)

	/* Part 1 */
	var minDistance = GetMinDistance(wiresPaths[0], wiresPaths[1])
	fmt.Printf("Min Manhattan Distance %d\n", minDistance)

	/* Part 2 */
	var minSteps = GetMinSteps(wiresPaths[0], wiresPaths[1])
	fmt.Printf("Min steps %d\n", minSteps)
}
