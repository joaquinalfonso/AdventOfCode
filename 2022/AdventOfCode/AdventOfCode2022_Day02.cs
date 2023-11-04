using System.Text;

namespace AdventOfCode {
    public static class AdventOfCode2022_Day02 {

        private enum PlaysType {
            Rock,
            Paper,
            Scissors
        }

        private enum RoundResultType {
            Lose,
            Draw,
            Win
        }

        public static int CalculateA(IEnumerable<string> lines) {

            var total = 0;

            foreach (var line in lines) {
                var oponentPlay = GetPlayType(line.Split(' ')[0]);
                var myPlay = GetPlayType(line.Split(' ')[1]);
                total += GetPlayScore(myPlay) + GetRoundScore(oponentPlay, myPlay);
            }
            return total;

            PlaysType GetPlayType(string play) {
                if (play.Equals("A") || play.Equals("X")) {
                    return PlaysType.Rock;
                }

                if (play.Equals("B") || play.Equals("Y")) {
                    return PlaysType.Paper;
                }
                return PlaysType.Scissors;
            }

            int GetPlayScore(PlaysType play) {
                if (play.Equals(PlaysType.Rock)) {
                    return 1;
                }

                if (play.Equals(PlaysType.Paper)) {
                    return 2;
                }
                return 3;
            }

            int GetRoundScore(PlaysType oponentPlay, PlaysType myPlay) {
                if (oponentPlay == myPlay) {
                    return 3; //Draw
                }
                if (myPlay.Equals(PlaysType.Rock) && oponentPlay.Equals(PlaysType.Scissors)
                   || myPlay.Equals(PlaysType.Scissors) && oponentPlay.Equals(PlaysType.Paper)
                   || myPlay.Equals(PlaysType.Paper) && oponentPlay.Equals(PlaysType.Rock)
                    ) {
                    return 6; //Win
                }
                return 0; //Loose
            }
        }

        public static int CalculateB(IEnumerable<string> lines) {

            var total = 0;

            foreach (var line in lines) {
                var oponentPlay = GetPlayType(line.Split(' ')[0]);
                var roundResult = GetRoundResult(line.Split(' ')[1]);
                var myPlay = WhatToPlay(oponentPlay, roundResult);
                total += GetPlayScore(myPlay) + GetRoundScore(oponentPlay, myPlay);
            }
            return total;

            PlaysType GetPlayType(string play) {
                if (play.Equals("A") || play.Equals("X")) {
                    return PlaysType.Rock;
                }

                if (play.Equals("B") || play.Equals("Y")) {
                    return PlaysType.Paper;
                }
                return PlaysType.Scissors;
            }

            RoundResultType GetRoundResult(string play) {
                if (play.Equals("X")) {
                    return RoundResultType.Lose;
                }

                if (play.Equals("Y")) {
                    return RoundResultType.Draw;
                }
                return RoundResultType.Win;
            }

            int GetPlayScore(PlaysType play) {
                if (play.Equals(PlaysType.Rock)) {
                    return 1;
                }

                if (play.Equals(PlaysType.Paper)) {
                    return 2;
                }
                return 3;
            }

            PlaysType WhatToPlay(PlaysType oponentPlay, RoundResultType roundResult) {
                if (roundResult == RoundResultType.Draw) {
                    return oponentPlay;
                }

                if (oponentPlay == PlaysType.Rock) {
                    if (roundResult == RoundResultType.Lose) {
                        return PlaysType.Scissors;
                    }
                    return PlaysType.Paper;
                }

                if (oponentPlay == PlaysType.Paper) {
                    if (roundResult == RoundResultType.Lose) {
                        return PlaysType.Rock;
                    }
                    return PlaysType.Scissors;
                }

                if (roundResult == RoundResultType.Lose) {
                    return PlaysType.Paper;
                }
                return PlaysType.Rock;
            }

            int GetRoundScore(PlaysType oponentPlay, PlaysType myPlay) {
                if (oponentPlay == myPlay) {
                    return 3; //Draw
                }
                if (myPlay.Equals(PlaysType.Rock) && oponentPlay.Equals(PlaysType.Scissors)
                   || myPlay.Equals(PlaysType.Scissors) && oponentPlay.Equals(PlaysType.Paper)
                   || myPlay.Equals(PlaysType.Paper) && oponentPlay.Equals(PlaysType.Rock)
                    ) {
                    return 6; //Win
                }
                return 0; //Loose
            }
        }


    }
}