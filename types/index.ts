type XOwinner = {
  winner: number;
  sequence?: number[]
}
export type XOGameStore = {
  isFirstPlayerTurn: boolean;
  matrix: number[]; // 3 x 3
  isCompleted: () => boolean;
  setValue: (x: number, y: number, value: number) => void;
  gameMap: () => number[][]; // chunks
  gameValues: () => number[]; // only the x o value of each square
  isWon: () => XOwinner;
  reset: () => void;
  getPoint?: (x: number, y: number) => number[];
};

export type FourGameStore = {
  isFirstPlayerTurn: boolean;
  matrix: number[]; // 3 x 3
};
