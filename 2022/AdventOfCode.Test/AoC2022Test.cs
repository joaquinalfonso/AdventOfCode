using AdventOfCode;
using FluentAssertions;

namespace AdventOfCode.Test {
    public class AoC2022Test {

        private string DATA_PATH => Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory())?.Parent?.Parent?.Parent?.FullName, "Data");

        [Theory]
        [InlineData(@"01\test.txt", 24000)]
        [InlineData(@"01\input.txt", 70764)]
        public void Day01ATest(string dataFile, int expected) {
            //Arrange
            var filePath = Path.Combine(DATA_PATH, dataFile);
            var lines = File.ReadAllLines(filePath);

            //Act
            var calculated = AoC2022_Day01.CalculateA(lines);

            //Assert
            calculated.Should().Be(expected);
        }

        [Theory]
        [InlineData(@"01\test.txt", 45000)]
        [InlineData(@"01\input.txt", 203905)]
        public void Day01BTest(string dataFile, int expected) {
            //Arrange
            var filePath = Path.Combine(DATA_PATH, dataFile);
            var lines = File.ReadAllLines(filePath);

            //Act
            var calculated = AoC2022_Day01.CalculateB(lines);

            //Assert
            calculated.Should().Be(expected);
        }

        [Theory]
        [InlineData(@"02\test.txt", 15)]
        [InlineData(@"02\input.txt", 13268)]
        public void Day02ATest(string dataFile, int expected) {
            //Arrange
            var filePath = Path.Combine(DATA_PATH, dataFile);
            var lines = File.ReadAllLines(filePath);

            //Act
            var calculated = AoC2022_Day02.CalculateA(lines);

            //Assert
            calculated.Should().Be(expected);
        }

        [Theory]
        [InlineData(@"02\test.txt", 12)]
        [InlineData(@"02\input.txt", 15508)]
        public void Day02BTest(string dataFile, int expected) {
            //Arrange
            var filePath = Path.Combine(DATA_PATH, dataFile);
            var lines = File.ReadAllLines(filePath);

            //Act
            var calculated = AoC2022_Day02.CalculateB(lines);

            //Assert
            calculated.Should().Be(expected);
        }

        [Theory]
        [InlineData(@"03\test.txt", 157)]
        [InlineData(@"03\input.txt", 8394)]
        public void Day03ATest(string dataFile, int expected) {
            //Arrange
            var filePath = Path.Combine(DATA_PATH, dataFile);
            var lines = File.ReadAllLines(filePath);

            //Act
            var calculated = AoC2022_Day03.CalculateA(lines);

            //Assert
            calculated.Should().Be(expected);
        }
    }
}