// get the box index in a matrix given its x and y coordinates and the width of a matrix row
// returns a single box index
export const getIndex = (x: number, y: number, X: number): number => y * X + x;
// get the x and y coordinates given the index and the width of a matrix row
// returns a single box coordinates [x, y]
export const getCoords = (i: number, X: number): number[] => [
  i % X,
  Math.floor(i / X),
];
// get an additional value from the box (other than x and y) given the matrix chunk size and the value's index in the box
// returns the whole matrix mapped to the required value
export const getValues = (
  matrix: number[],
  chunkSize: number,
  boxIndex: number
) => matrix.filter((_, index) => index % chunkSize === boxIndex);
// divides the 1d matrix to 2d matrix of boxes (array of arrays), all boxes are the same size (length) which is 2 slots (for x
// and y coordinates) plus any additional values stored in each box
export const chunkArray = (arr: any[], chunkSize: number) =>
  arr.length
    ? [arr.slice(0, chunkSize), ...chunkArray(arr.slice(chunkSize), chunkSize)]
    : [];
// Create a 1d matrix given width and height and any default additional values stored in boxes
// returns 1d matrix
export const createMatrix = (
  width: number,
  height: number,
  defaultValues: number[] = []
) =>
  Array(width * height)
    .fill(0)
    .map((_, index) => [...getCoords(index, width), ...defaultValues])
    .flat();
