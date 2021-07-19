import { animated } from "@react-spring/web";
import { useCallback } from "react";
import useGameStore from "../../../components/xo/useGameStore";

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
  const setY = useGameStore(
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
