export type GameStore = {
  isFirstPlayerTurn: boolean;
  matrix: number[]; // 3 x 3
  isCompleted: () => boolean;
  setValue: (x: number, y: number, value: number) => void;
  gameMap: () => number[][]; // chunks
  gameValues: () => number[]; // only the x o value of each square
  isWon: () => number;
  reset: () => void;
};
