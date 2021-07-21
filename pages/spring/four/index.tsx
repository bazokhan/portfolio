import { useCallback } from "react";
import { animated } from "react-spring";
import useGameStore from "../../../components/four/useGameStore";
import Matrix from "../../../components/Matrix";
import { getIndex } from "../../../helpers";

const ConnectFour = () => {
  const isFirstPlayerTurn = useGameStore((state) => state.isFirstPlayerTurn);
  const gameMap = useGameStore((state) => state.gameMap());
  const getPoint = useGameStore((state) => state.getPoint);
  const setPoint = useGameStore((state) => state.setValue);
  const isWon = useGameStore((state) => state.isWon());
  const isCompleted = useGameStore((state) => state.isCompleted());
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
        className={`w-[700px] h-[600px] border border-black box-border mx-auto mt-[40px] ${
          isFirstPlayerTurn ? "bg-blue-100" : "bg-red-100"
        }`}
        x={7}
        y={6}
        gameMatrix={gameMap}
        box={({ box: [x, y, boxValue], className }) => (
          <button
            className={`${className} border border-black box-border m-0 w-[99px] h-[99px] flex items-center justify-center p-1 ${
              isWon.sequence?.includes(getIndex(x, y, 7))
                ? "bg-yellow-500"
                : isFirstPlayerTurn
                ? "hover:bg-blue-200"
                : "hover:bg-red-200"
            }`}
            key={`${x}${y}`}
            onClick={() => {
              if (isCompleted) return;
              const Y = 6;
              let currentY = Y - 1;
              while (currentY >= 0) {
                const currentPoint = getPoint(x, currentY);
                if (currentPoint[2] > 0) {
                  currentY -= 1;
                  continue;
                } else {
                  setPoint(x, currentY, isFirstPlayerTurn ? 1 : 2);
                  break;
                }
              }
            }}
          >
            {boxValue ? (
              <animated.div
                className={`w-full h-full rounded-full font-black ${
                  boxValue === 1
                    ? "bg-blue-500"
                    : boxValue === 2
                    ? "bg-red-500"
                    : ""
                } border-4 ${
                  boxValue === 1
                    ? "border-blue-800"
                    : boxValue === 2
                    ? "border-red-800"
                    : ""
                }`}
              />
            ) : null}
          </button>
        )}
      />
      <button onClick={reset}>Reset</button>
    </>
  );
};

export default ConnectFour;
