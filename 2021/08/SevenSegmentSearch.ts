/*
--- Day 8: Seven Segment Search ---

You barely reach the safety of the cave when the whale smashes into the cave mouth, collapsing it. Sensors indicate another exit to this cave at a much greater depth, so you have no choice but to press on.

As your submarine slowly makes its way through the cave system, you notice that the four-digit seven-segment displays in your submarine are malfunctioning; they must have been damaged during the escape. You'll be in a lot of trouble without them, so you'd better figure out what's wrong.

Each digit of a seven-segment display is rendered by turning on or off any of seven segments named a through g:

  0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg

 So, to render a 1, only segments c and f would be turned on; the rest would be off. To render a 7, only segments a, c, and f would be turned on.

The problem is that the signals which control the segments have been mixed up on each display. The submarine is still trying to display numbers by producing output on signal wires a through g, but those wires are connected to segments randomly. Worse, the wire/segment connections are mixed up separately for each four-digit display! (All of the digits within a display use the same connections, though.)

So, you might know that only signal wires b and g are turned on, but that doesn't mean segments b and g are turned on: the only digit that uses two segments is 1, so it must mean segments c and f are meant to be on. With just that information, you still can't tell which wire (b/g) goes to which segment (c/f). For that, you'll need to collect more information.

For each display, you watch the changing signals for a while, make a note of all ten unique signal patterns you see, and then write down a single four digit output value (your puzzle input). Using the signal patterns, you should be able to work out which pattern corresponds to which digit.

For example, here is what you might see in a single entry in your notes:

acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab |
cdfeb fcadb cdfeb cdbaf
(The entry is wrapped here to two lines so it fits; in your notes, it will all be on a single line.)

Each entry consists of ten unique signal patterns, a | delimiter, and finally the four digit output value. Within an entry, the same wire/segment connections are used (but you don't know what the connections actually are). The unique signal patterns correspond to the ten different ways the submarine tries to render a digit using the current wire/segment connections. Because 7 is the only digit that uses three segments, dab in the above example means that to render a 7, signal lines d, a, and b are on. Because 4 is the only digit that uses four segments, eafb means that to render a 4, signal lines e, a, f, and b are on.

Using this information, you should be able to work out which combination of signal wires corresponds to each of the ten digits. Then, you can decode the four digit output value. Unfortunately, in the above example, all of the digits in the output value (cdfeb fcadb cdfeb cdbaf) use five segments and are more difficult to deduce.

For now, focus on the easy digits. Consider this larger example:

be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb |
fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec |
fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef |
cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega |
efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga |
gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf |
gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf |
cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd |
ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg |
gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc |
fgae cfgab fg bagce

Because the digits 1, 4, 7, and 8 each use a unique number of segments, you should be able to tell which combinations of signals correspond to those digits. Counting only digits in the output values (the part after | on each line), in the above example, there are 26 instances of digits that use a unique number of segments (highlighted above).

In the output values, how many times do digits 1, 4, 7, or 8 appear?

--- Part Two ---

Through a little deduction, you should now be able to determine the remaining digits. Consider again the first example above:

acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab |
cdfeb fcadb cdfeb cdbaf
After some careful analysis, the mapping between signal wires and segments only make sense in the following configuration:

 dddd
e    a
e    a
 ffff
g    b
g    b
 cccc

So, the unique signal patterns would correspond to the following digits:

acedgfb: 8
cdfbe: 5
gcdfa: 2
fbcad: 3
dab: 7
cefabd: 9
cdfgeb: 6
eafb: 4
cagedb: 0
ab: 1

Then, the four digits of the output value can be decoded:

cdfeb: 5
fcadb: 3
cdfeb: 5
cdbaf: 3

Therefore, the output value for this entry is 5353.

Following this same process for each entry in the second, larger example above, the output value of each entry can be determined:

fdgacbe cefdb cefbgd gcbe: 8394
fcgedb cgb dgebacf gc: 9781
cg cg fdcagb cbg: 1197
efabcd cedba gadfec cb: 9361
gecf egdcabf bgf bfgea: 4873
gebdcfa ecba ca fadegcb: 8418
cefg dcbef fcge gbcadfe: 4548
ed bcgafe cdgba cbgef: 1625
gbdfcae bgc cg cgb: 8717
fgae cfgab fg bagce: 4315
Adding all of the output values in this larger example produces 61229.

For each entry, determine all of the wire/segment connections and decode the four-digit output values. What do you get if you add up all of the output values?

*/

let fs = require('fs');
let ps = require('process');

const SEGMENTS_NUMBER_OF_1: number = 2;
const SEGMENTS_NUMBER_OF_4: number = 4;
const SEGMENTS_NUMBER_OF_7: number = 3;
const SEGMENTS_NUMBER_OF_8: number = 7;

function GetInputList(filename: string): string[][][] {
    try {
        let data: string = fs.readFileSync(filename, 'utf8');
        let list = data.replace(/\r/g, "").split("\n").map(line => line.split('|').map(a => a.trim().split(" ")));
        return list;
    } catch (e) {
        console.log('Error:', e.stack);
    }
}

function IsUniqueSegment(signal: string): boolean {
    return signal.length === SEGMENTS_NUMBER_OF_1 ||
        signal.length === SEGMENTS_NUMBER_OF_4 ||
        signal.length === SEGMENTS_NUMBER_OF_7 ||
        signal.length === SEGMENTS_NUMBER_OF_8;
}

function CountInput(inputlist: string[][][]): number {
    let total = 0;
    inputlist.map(line => {
        line[1].map(token => {
            total += IsUniqueSegment(token) ? 1 : 0;
        })
    });
    return total;
}

function SetContainsSubset(set: string[], subSet: string[]): boolean {
    return set.some(val => subSet.indexOf(val) === -1);
}

function SetContainSubset(a: Set<string>, b: Set<string>): boolean {
    return Array.from(a).length == Array.from(new Set([...a, ...b])).length;
}

function SetsDifference(a: Set<string>, b: Set<string>): Set<string> {
    let difference = new Set([...a].filter(x => !b.has(x)));
    return difference;
}

function SetsUnion(a: Set<string>, b: Set<string>): Set<string> {
    let union = new Set([...a, ...b]);
    return union;
}

function SetsAreEqual(as: Set<string>, bs: Set<string>):boolean {
    if (as.size !== bs.size) return false;
    for (var a of as) if (!bs.has(a)) return false;
    return true;
}

function GetDigit(token: string, stringMap: Map<string, number>): number {
    for (const [key, value] of stringMap.entries()) {
        if (SetsAreEqual(new Set(key), new Set(token))) {
            return value;
        }
    }
}

function DecodeLine(line: string[][]): number {
    let stringMap = GetDigitsMap(line[0]);

    let digits: string = "";
    line[1].map(token => {
        digits += GetDigit(token, stringMap).toString();
    });

    return parseInt(digits);
};

function GetDigitsMap(line: string[]): Map<string, number> {
    let digitsMap = new Map<number, string>();

    let stringMap = new Map<string, number>();

    for (let i = 0; i <= 9; i++) {
        digitsMap.set(i, "");
    }

    line.map(token => {

        if (token.length === SEGMENTS_NUMBER_OF_1) {
            digitsMap.set(1, token);
            stringMap.set(token, 1);
            return;
        }

        if (token.length === SEGMENTS_NUMBER_OF_4) {
            digitsMap.set(4, token);
            stringMap.set(token, 4);
            return;
        }

        if (token.length === SEGMENTS_NUMBER_OF_7) {
            digitsMap.set(7, token);
            stringMap.set(token, 7);
            return;
        }

        if (token.length === SEGMENTS_NUMBER_OF_8) {
            digitsMap.set(8, token);
            stringMap.set(token, 8);
            return;
        }

    });

    let oneSet = new Set(digitsMap.get(1));
    let fourSet = new Set(digitsMap.get(4));
    let eightSet = new Set(digitsMap.get(8));
    let fourMinusOneSet = SetsDifference(fourSet, oneSet);
    let eightMinusFourSet = SetsDifference(eightSet, fourSet);
    let eightMinusOneSet = SetsDifference(eightSet, oneSet);
    let eightMinusFourPlusOneSet = SetsUnion(eightMinusFourSet, oneSet);

    line.map(token => {

        let tokenSet = new Set(token);

        if (token.length === 5 && SetContainSubset(tokenSet, oneSet)) {
            digitsMap.set(3, token);
            stringMap.set(token, 3);
            return;
        }

        if (token.length === 5 && SetContainSubset(tokenSet, fourMinusOneSet)) {
            digitsMap.set(5, token);
            stringMap.set(token, 5);
            return;
        }

        if (token.length === 5 && SetContainSubset(tokenSet, eightMinusFourSet)) {
            digitsMap.set(2, token);
            stringMap.set(token, 2);
            return;
        }

        if (token.length === 6 && SetContainSubset(tokenSet, fourSet)) {
            digitsMap.set(9, token);
            stringMap.set(token, 9);
            return;
        }

        if (token.length === 6 && SetContainSubset(tokenSet, eightMinusOneSet)) {
            digitsMap.set(6, token);
            stringMap.set(token, 6);
            return;
        }

        if (token.length === 6 && SetContainSubset(tokenSet, eightMinusFourPlusOneSet)) {
            digitsMap.set(0, token);
            stringMap.set(token, 0);
            return;
        }
    });
    return stringMap;
};

function DecodeInput(inputlist: string[][][]): number {
    let total = 0;
    inputlist.map(line => {
        total += DecodeLine(line);
    });
    return total;
}

/*--- Part One ---*/
let inputList = GetInputList(ps.cwd() + '\\data\\input.txt')
let count = CountInput(inputList);
console.log("Times digits 1, 4, 7, or 8 appear: " + count);

/*--- Part Two ---*/
count = DecodeInput(inputList);
console.log("Sum of all output values: " + count);