namespace AdventOfCode {
    public static class AoC2022_Day01 {

        public static int CalculateA(IEnumerable<string> lines) {

            var max = int.MinValue;

            var total = 0;
            foreach (var line in lines.Append("")) {
                if (String.IsNullOrEmpty(line)) {
                    if (total > max) {
                        max = total;
                    }
                    total = 0;
                    continue;
                }
                total += int.Parse(line);
            }
            return max;
        }


        public static int CalculateB(IEnumerable<string> lines) {
            var caloriesByElf = new Dictionary<int, int>();
            var total = 0;
            var elfNumber = 0;
            foreach (var line in lines.Append("")) {
                if (String.IsNullOrEmpty(line)) {
                    elfNumber++;
                    caloriesByElf.Add(elfNumber, total);
                    total = 0;
                    continue;
                }
                total += int.Parse(line);
            }
            var sum = caloriesByElf.OrderByDescending(key => key.Value).Take(3).Sum(key => key.Value);

            return sum;
        }

    }
}