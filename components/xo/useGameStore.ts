import create from "zustand";
import { chunkArray, getIndex, getValues } from "../../helpers";
import { GameStore } from "../../types";

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

const useGameStore = create<GameStore>((set, get) => ({
  ...defaultState,
  isCompleted: () =>
    get().isWon() > 0 ||
    get()
      .gameValues()
      .every((v) => v > 0),
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
  gameMap: () => chunkArray(get().matrix, matrixSizeX),
  gameValues: () => getValues(get().matrix, matrixChunkSize, 2),
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
    const XWins = possibleWins.some((win) =>
      win.every((v) => currentXValues.includes(v))
    );
    const OWins = possibleWins.some((win) =>
      win.every((v) => currentOValues.includes(v))
    );
    return XWins ? 1 : OWins ? 2 : 0;
  },
  reset: () => set(() => defaultState),
}));

export default useGameStore;
