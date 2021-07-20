import { useCallback } from "react";
import { animated } from "react-spring";
import useGameStore from "../../../components/four/useGameStore";
import Matrix from "../../../components/Matrix";

const ConnectFour = () => {
  const isFirstPlayerTurn = useGameStore((state) => state.isFirstPlayerTurn);
  const gameMap = useGameStore((state) => state.gameMap());
  const getPoint = useGameStore((state) => state.getPoint);
  const setPoint = useGameStore((state) => state.setValue);
  const reset = useGameStore((state) => state.reset);

  return (
    <Matrix
      className={`w-[700px] h-[600px] border border-black box-border mx-auto mt-[40px] ${
        isFirstPlayerTurn ? "bg-blue-100" : "bg-red-100"
      }`}
      x={7}
      y={6}
      gameMatrix={gameMap}
      box={({ box: [x, y, boxValue], className }) => (
        <button
          className={`${className} border border-black box-border m-0 p-1 ${
            isFirstPlayerTurn ? "hover:bg-blue-200" : "hover:bg-red-200"
          } w-[99px] h-[99px] flex items-center justify-center`}
          key={`${x}${y}`}
          onClick={() => {
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
  );
};

export default ConnectFour;
