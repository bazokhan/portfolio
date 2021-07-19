import { animated } from "@react-spring/web";
import { useCallback } from "react";
import create from "zustand";

type RootSore = {
  clicks: number;
  increment: () => void;
  decrement: () => void;
};

type GameStore = {
  isFirstPlayerTurn: boolean;
  matrix: number[]; // 3 x 3
  isCompleted: () => boolean;
  setValue: (x: number, y: number, value: number) => void;
  gameMap: () => number[][]; // chunks
  gameValues: () => number[]; // only the x o value of each square
  isWon: () => number;
  reset: () => void;
};

const getIndex = (x: number, y: number, X: number): number => y * X + x;
const getCoords = (i: number, X: number): number[] => [
  i % X,
  Math.floor(i / X),
];
const matrixChunkSize = 3;
const matrixSizeX = 3;

const matrix = [
  0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 1, 0, 1, 1, 0, 2, 1, 0, 0, 2, 0, 1, 2, 0, 2, 2,
  0,
];

const getValues = (matrix: number[], chunkSize: number, boxIndex: number) =>
  matrix.filter((_, index) => index % chunkSize === boxIndex);

const chunkArray = (arr: any[], chunkSize: number) =>
  arr.length
    ? [arr.slice(0, chunkSize), ...chunkArray(arr.slice(chunkSize), chunkSize)]
    : [];

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

const useStore = create<RootSore>((set) => ({
  clicks: 0,
  increment: () => set((state) => ({ clicks: state.clicks + 1 })),
  decrement: () => set((state) => ({ clicks: state.clicks - 1 })),
}));

const XoPage = () => {
  //   const clicks = useStore((state) => state.clicks);
  //   const increment = useStore((state) => state.increment);
  //   const decrement = useStore((state) => state.decrement);
  const isFirstPlayerTurn = useGameStore((state) => state.isFirstPlayerTurn);
  const gameMap = useGameStore((state) => state.gameMap());
  const isWon = useGameStore((state) => state.isWon());
  const isCompleted = useGameStore((state) => state.isCompleted());
  const setX = useGameStore(
    useCallback(
      (state) => (x: number, y: number) => state.setValue(x, y, 1),
      []
    )
  );
  const setY = useGameStore(
    useCallback(
      (state) => (x: number, y: number) => state.setValue(x, y, 2),
      []
    )
  );
  const clear = useGameStore(
    useCallback(
      (state) => (x: number, y: number) => state.setValue(x, y, 0),
      []
    )
  );

  const reset = useGameStore((state) => state.reset);

  return (
    <>
      {isCompleted ? <p>Complete</p> : <p>Going</p>}
      {isFirstPlayerTurn ? (
        <p>1st Player turn (X)</p>
      ) : (
        <p>2nd Player turn (O)</p>
      )}
      {isWon === 1 ? (
        <p>1st PLayer Wins (X)</p>
      ) : isWon === 2 ? (
        <p>2nd PLayer Wins (O)</p>
      ) : (
        <p>No one wins</p>
      )}
      <div
        className={`w-[300px] h-[300px] border border-black flex justify-center items-center flex-wrap box-border mx-auto mt-[40px] ${
          isFirstPlayerTurn ? "bg-blue-100" : "bg-red-100"
        }`}
      >
        {gameMap.map((box) => (
          <button
            className={`w-[33%] h-[33%] border border-black box-border m-0 ${
              isFirstPlayerTurn ? "hover:bg-blue-200" : "hover:bg-red-200"
            }`}
            onClick={() => {
              if (isCompleted) return;
              if (box[2]) return;
              if (isFirstPlayerTurn) {
                setX(box[0], box[1]);
              } else {
                setY(box[0], box[1]);
              }
            }}
            key={box.join("")}
          >
            <animated.p
              className={`text-8xl font-black ${
                box[2] === 1
                  ? "text-blue-800"
                  : box[2] === 2
                  ? "text-red-800"
                  : ""
              }`}
            >
              {box[2] === 1 ? "X" : box[2] === 2 ? "O" : ""}
            </animated.p>
          </button>
        ))}
      </div>
      <button onClick={reset}>Reset</button>
    </>
  );
};

export default XoPage;
