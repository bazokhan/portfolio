import { animated } from "@react-spring/web";
import { useCallback } from "react";
import Matrix from "../../../components/Matrix";
import useGameStore from "../../../components/xo/useGameStore";
import { getIndex } from "../../../helpers";

const XoPage = () => {
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
  const setO = useGameStore(
    useCallback(
      (state) => (x: number, y: number) => state.setValue(x, y, 2),
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
      {isWon.winner === 1 ? (
        <p>1st PLayer Wins (X)</p>
      ) : isWon.winner === 2 ? (
        <p>2nd PLayer Wins (O)</p>
      ) : (
        <p>No one wins</p>
      )}
      <Matrix
        className={`w-[500px] h-[300px] border border-black box-border mx-auto mt-[40px] ${
          isFirstPlayerTurn ? "bg-blue-100" : "bg-red-100"
        }`}
        x={3}
        y={3}
        gameMatrix={gameMap}
        box={({ box: [x, y, boxValue], className }) => (
          <button
            className={`${className} border border-black box-border m-0 ${
              isWon.sequence?.includes(getIndex(x, y, 3))
                ? "bg-yellow-500"
                : isFirstPlayerTurn
                ? "hover:bg-blue-200"
                : "hover:bg-red-200"
            }`}
            onClick={() => {
              if (isCompleted) return;
              if (boxValue) return;
              if (isFirstPlayerTurn) {
                setX(x, y);
              } else {
                setO(x, y);
              }
            }}
            key={`${x}${y}`}
          >
            <animated.p
              className={`text-8xl font-black ${
                boxValue === 1
                  ? "text-blue-800"
                  : boxValue === 2
                  ? "text-red-800"
                  : ""
              }`}
            >
              {boxValue === 1 ? "X" : boxValue === 2 ? "O" : ""}
            </animated.p>
          </button>
        )}
      />
      <button onClick={reset}>Reset</button>
    </>
  );
};

export default XoPage;
