import { useCallback } from "react";
import { animated, useSpring, useSprings } from "react-spring";
import useGameStore from "../../../components/four/useGameStore";
import Matrix from "../../../components/Matrix";
import Button from "../../../components/shared/ResetButton";
import ScoreBoard from "../../../components/shared/ScoreBoard";
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
      <ScoreBoard
        isCompleted={isCompleted}
        isFirstPlayerTurn={isFirstPlayerTurn}
        winner={isWon.winner}
      />
      <Matrix
        className={`w-[700px] h-[600px] rounded-md mx-auto mt-[40px] bg-gray-500`}
        x={7}
        y={6}
        gameMatrix={gameMap}
        box={({ box: [x, y, boxValue], className }) => (
          <button
            className={`${className} border-4 border-gray-500 rounded-full m-0 w-[99px] h-[99px] flex items-center justify-center p-1 ${
              isWon.sequence?.includes(getIndex(x, y, 7))
                ? "bg-yellow-500"
                : isFirstPlayerTurn
                ? "bg-blue-100 hover:bg-blue-200"
                : "bg-red-100 hover:bg-red-200"
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
          </button>
        )}
      />
      <Button onClick={reset}>Restart</Button>
    </>
  );
};

export default ConnectFour;
