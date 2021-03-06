import create from "zustand";
import { chunkArray, getIndex, getValues } from "../../helpers";
import { XOGameStore } from "../../types";

const matrixChunkSize = 3;
const matrixSizeX = 3;

const matrix = [
  0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 1, 0, 1, 1, 0, 2, 1, 0, 0, 2, 0, 1, 2, 0, 2, 2,
  0,
];

const defaultState = {
  isFirstPlayerTurn: true,
  matrix,
};

const possibleWins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const useGameStore = create<XOGameStore>((set, get) => ({
  //========= model
  ...defaultState,
  //========= views
  // determine if the game is completed or if the active player can still play
  // the game is finished when somebody has won or there are no more boxes to set the value of
  isCompleted: () =>
    get().isWon().winner > 0 ||
    get()
      .gameValues()
      .every((v) => v > 0),
  // divide the 1d matrix to 2d matrix for rendering, each box is an array of chunkSize length
  gameMap: () => chunkArray(get().matrix, matrixSizeX),
  // get a mapped matrix, with only the data stored in the box at the specified index (here it's 2 which the xo value)
  gameValues: () => getValues(get().matrix, matrixChunkSize, 2),
  // determine if either player has won
  // return 0 (none), 1 (player1), 2 (player2)
  isWon: () => {
    const currentValues = get().gameValues();
    const currentXValues = currentValues.reduce(
      (acc, v, index) => (v === 1 ? [...acc, index] : acc),
      []
    );
    const currentOValues = currentValues.reduce(
      (acc, v, index) => (v === 2 ? [...acc, index] : acc),
      []
    );
    const XWins = possibleWins.find((win) =>
      win.every((v) => currentXValues.includes(v))
    );
    const OWins = possibleWins.find((win) =>
      win.every((v) => currentOValues.includes(v))
    );
    return XWins
      ? { winner: 1, sequence: XWins }
      : OWins
      ? { winner: 2, sequence: OWins }
      : { winner: 0, sequence: null };
  },
  //========= actions
  // generic function to update values inside boxes
  // it also toggles the player turn which should be separated in a another method TODO:
  setValue: (x: number, y: number, value: number) => {
    const index = getIndex(x, y, matrixSizeX);
    const matrixIndex = index * matrixChunkSize;
    set((state) => {
      const chunk = state.matrix.slice(
        matrixIndex,
        matrixIndex + matrixChunkSize
      );
      const newMatrix = [...state.matrix];
      newMatrix.splice(matrixIndex, 3, ...chunk.slice(0, 2), value);
      return { matrix: newMatrix, isFirstPlayerTurn: !state.isFirstPlayerTurn };
    });
  },
  // reset the default state of the model
  reset: () => set(() => defaultState),
}));

export default useGameStore;
