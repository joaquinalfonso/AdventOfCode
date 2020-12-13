/*

--- Day 4: Secure Container ---

You arrive at the Venus fuel depot only to discover it's protected by a password. The Elves had written the password on a sticky note, but someone threw it out.

However, they do remember a few key facts about the password:

It is a six-digit number.
The value is within the range given in your puzzle input.
Two adjacent digits are the same (like 22 in 122345).
Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).
Other than the range rule, the following are true:

111111 meets these criteria (double 11, never decreases).
223450 does not meet these criteria (decreasing pair of digits 50).
123789 does not meet these criteria (no double).

How many different passwords within the range given in your puzzle input meet these criteria?

--- Part Two ---

An Elf just remembered one more important detail: the two adjacent matching digits are not part of a larger group of matching digits.

Given this additional criterion, but still ignoring the range rule, the following are now true:

112233 meets these criteria because the digits never decrease and all repeated digits are exactly two digits long.
123444 no longer meets the criteria (the repeated 44 is part of a larger group of 444).
111122 meets the criteria (even though 1 is repeated more than twice, it still contains a double 22).

How many different passwords within the range given in your puzzle input meet all of the criteria?
*/

package main

import (
	"fmt"
	"strconv"
)

const RANGE_START = 178416
const RANGE_END = 676461

const PASSWORD_LENGTH = 6

type PasswordValidation func(int) bool

func IsPasswordValid(password int) bool {
	var passwordString string = strconv.Itoa(password)
	if len(passwordString) != PASSWORD_LENGTH {
		return false
	}

	adjacentsDigits := false
	for i := 0; i < PASSWORD_LENGTH; i++ {
		if i > 0 {
			if passwordString[i-1] > passwordString[i] {
				return false
			}
			if passwordString[i-1] == passwordString[i] {
				adjacentsDigits = true
			}
		}
	}
	if !adjacentsDigits {
		return false
	}
	return true
}

func IsPasswordValid2DigitsGroup(password int) bool {
	var passwordString string = strconv.Itoa(password)
	if len(passwordString) != PASSWORD_LENGTH {
		return false
	}

	var numbersCount = make(map[int]int)

	adjacentsDigits := false
	for i := 1; i < PASSWORD_LENGTH; i++ {

		number, _ := strconv.Atoi(string(passwordString[i]))

		if passwordString[i-1] > passwordString[i] {
			return false
		}
		if passwordString[i-1] == passwordString[i] {
			adjacentsDigits = true
			numbersCount[number]++
		}
	}

	if !adjacentsDigits {
		return false
	}

	only2Adjacents := false
	for _, count := range numbersCount {
		if count == 1 {
			only2Adjacents = true
		}
	}

	if !only2Adjacents {
		return false
	}

	return true
}

func CountValidPasswords(validationFunction PasswordValidation) int {
	validPasswords := 0
	for i := RANGE_START; i <= RANGE_END; i++ {
		if validationFunction(i) {
			validPasswords++
		}
	}
	return validPasswords
}

func main() {

	/* Part 1 */
	var validPasswords = CountValidPasswords(IsPasswordValid)
	fmt.Printf("Valid passwords: %d\n", validPasswords)

	/* Part 2 */
	var validPasswords2 = CountValidPasswords(IsPasswordValid2DigitsGroup)
	fmt.Printf("Valid passwords (2 digit group): %d\n", validPasswords2)

}
