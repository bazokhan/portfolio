import create from "zustand";
import { chunkArray, createMatrix, getIndex, getValues } from "../../helpers";
import { XOGameStore } from "../../types";
import checkCFWins from "./checkCFWins";

const matrixChunkSize = 3;
const matrixSizeX = 7;

const defaultState = {
  isFirstPlayerTurn: true,
  matrix: createMatrix(7, 6, [0]),
};

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
  gameMap: () => chunkArray(get().matrix, matrixChunkSize),
  // get a mapped matrix, with only the data stored in the box at the specified index (here it's 2 which the xo value)
  gameValues: () => getValues(get().matrix, matrixChunkSize, 2),
  getPoint: (x: number, y: number) => {
    const index = getIndex(x, y, matrixSizeX);
    const matrix = get().matrix;
    return matrix.slice(
      index * matrixChunkSize,
      index * matrixChunkSize + matrixChunkSize
    );
  },
  // determine if either player has won
  isWon: () => {
    const player1Map = get()
      .gameValues()
      .map((v, index) => {
        if (v === 1) return index;
        return null;
      })
      .filter((v) => v);
    const player2Map = get()
      .gameValues()
      .map((v, index) => {
        if (v === 2) return index;
        return null;
      })
      .filter((v) => v);
    const player1Won = player1Map.reduce(
      (acc, point) => {
        if (acc.winner > 0) return acc;
        const sequence = checkCFWins(point, 7, 6).find((win) =>
          win.every((v) => player1Map.includes(v))
        );
        if (sequence) {
          return { winner: 1, sequence };
        } else {
          return acc;
        }
      },
      { winner: 0, sequence: null }
    );
    const player2Won = player2Map.reduce(
      (acc, point) => {
        if (acc.winner > 0) return acc;
        const sequence = checkCFWins(point, 7, 6).find((win) =>
          win.every((v) => player2Map.includes(v))
        );
        if (sequence) {
          return { winner: 2, sequence };
        } else {
          return acc;
        }
      },
      { winner: 0, sequence: null }
    );
    return player1Won.winner
      ? player1Won
      : player2Won.winner
      ? player2Won
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
