export const getIndex = (x: number, y: number, X: number): number => y * X + x;
export const getCoords = (i: number, X: number): number[] => [
  i % X,
  Math.floor(i / X),
];

export const getValues = (matrix: number[], chunkSize: number, boxIndex: number) =>
  matrix.filter((_, index) => index % chunkSize === boxIndex);

export const chunkArray = (arr: any[], chunkSize: number) =>
  arr.length
    ? [arr.slice(0, chunkSize), ...chunkArray(arr.slice(chunkSize), chunkSize)]
    : [];
