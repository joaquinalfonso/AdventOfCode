using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdventOfCode {
    public static class AoC2022_Day04 {

        public static int CalculateA(IEnumerable<string> lines) {

            var total = 0;
            foreach (var line in lines) {
                var firstGroup = line.Split(',')[0];
                var secondGroup = line.Split(',')[1];

                total += IsContained(firstGroup, secondGroup) ? 1 : 0;
            }
            return total;

            bool IsContained(string firstGroup, string secondGroup) {
                var bound1Min = int.Parse(firstGroup.Split('-')[0]);
                var bound1Max = int.Parse(firstGroup.Split('-')[1]);
                var bound2Min = int.Parse(secondGroup.Split('-')[0]);
                var bound2Max = int.Parse(secondGroup.Split('-')[1]);

                return ((bound1Min >= bound2Min && bound1Max <= bound2Max) ||
                   (bound1Min <= bound2Min && bound1Max >= bound2Max));
            }
        }

        public static int CalculateB(IEnumerable<string> lines) {

            var total = 0;
            foreach (var line in lines) {
                var firstGroup = line.Split(',')[0];
                var secondGroup = line.Split(',')[1];

                total += IsOverlapped(firstGroup, secondGroup) ? 1 : 0;
            }
            return total;

            bool IsOverlapped(string firstGroup, string secondGroup) {
                var bound1Min = int.Parse(firstGroup.Split('-')[0]);
                var bound1Max = int.Parse(firstGroup.Split('-')[1]);
                var bound2Min = int.Parse(secondGroup.Split('-')[0]);
                var bound2Max = int.Parse(secondGroup.Split('-')[1]);

                return ((bound1Max >= bound2Min && bound1Min <= bound2Max));
            }
        }

    }
}
