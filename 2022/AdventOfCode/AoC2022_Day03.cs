using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdventOfCode {
    public static class AoC2022_Day03 {

        public static int CalculateA(IEnumerable<string> lines) {

            var total = 0;
            foreach (var line in lines) {
                var halfSize = line.Length / 2;
                var commonChar = FindCommonChar(line.Substring(0, halfSize), line.Substring(halfSize, halfSize));
                var priority = GetPriority(commonChar);
                total += priority;
            }
            return total;

            char FindCommonChar(string input, string input2) {
                char commonChar = new char();
                var charCount = new Dictionary<char, int>();

                foreach (char c in input) {
                    if (charCount.ContainsKey(c)) {
                        charCount[c]++;
                    } else {
                        charCount[c] = 1;
                    }
                }

                foreach (char c in input2) {
                    if (charCount.ContainsKey(c)) {
                        commonChar = c;
                    } 
                }

                return commonChar;
            }

            //Lowercase item types a through z have priorities 1 through 26.
            //Uppercase item types A through Z have priorities 27 through 52.
            int GetPriority(char input) {

                if(char.IsWhiteSpace(input)) {
                    return 0;
                }

                if (char.IsLower(input)) {
                    return (int)input - 96;
                }
                return (int)input - 38;
            }

        }

    }
}
