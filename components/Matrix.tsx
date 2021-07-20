import { FC } from "react";

type BoxProps = {
  className?: string;
  box: number[];
};

type MatrixProps = {
  className?: string;
  gameMatrix: number[][];
  x: number;
  y: number;
  box: FC<BoxProps>;
};

const MatrixComponent: FC<MatrixProps> = ({
  className,
  gameMatrix,
  x,
  y,
  box: Box,
}) => (
  <div className={`flex justify-center items-center flex-wrap ${className}`}>
    {gameMatrix.map((box: number[]) => (
      <Box
        className={`w-[${Math.floor(100 / x)}%] h-[${Math.floor(100 / y)}%]`}
        key={box.join("")}
        box={box}
      />
    ))}
  </div>
);

export default MatrixComponent;
