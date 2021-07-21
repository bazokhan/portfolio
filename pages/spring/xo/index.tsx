import { animated } from "@react-spring/web";
import { useCallback } from "react";
import { useSpring } from "react-spring";
import Matrix from "../../../components/Matrix";
import Button from "../../../components/shared/ResetButton";
import ScoreBoard from "../../../components/shared/ScoreBoard";
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

  const styles = useSpring({
    to: { transform: `rotateY(180deg)` },
    from: { transform: `rotateY(0deg)` },
    loop: true,
  });

  return (
    <>
      <ScoreBoard
        isCompleted={isCompleted}
        isFirstPlayerTurn={isFirstPlayerTurn}
        winner={isWon.winner}
      />
      <Matrix
        className={`w-[500px] h-[500px] rounded-md mx-auto mt-[40px] ${
          isFirstPlayerTurn ? "bg-blue-100" : "bg-red-100"
        }`}
        x={3}
        y={3}
        gameMatrix={gameMap}
        box={({ box: [x, y, boxValue], className }) => (
          <button
            className={`${className} border border-white shadow-sm m-0 ${
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
              style={{
                transform: isWon.sequence?.includes(getIndex(x, y, 3))
                  ? styles.transform
                  : "none",
                transformOrigin: "center center",
              }}
            >
              {boxValue === 1 ? "X" : boxValue === 2 ? "O" : ""}
            </animated.p>
          </button>
        )}
      />
      <Button onClick={reset}>Restart</Button>
    </>
  );
};

export default XoPage;
