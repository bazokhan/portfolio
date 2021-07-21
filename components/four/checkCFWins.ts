const checkCFWins = (index: number, X: number, Y: number) => {
  const has3Right = index % X < X - 3; // has at least three boxes to the right
  const has2Right1Left = index % X > 0 && index % X < X - 2; // has at least one box to the left and two boxes to the right
  const has1Right2Left = index % X > 1 && index % X < X - 1; // has at least two boxes to the left and one box to the right
  const has3Left = index % X > 2; // has at least three boxes to the left
  const has3Bottom = Math.floor(index / Y) < Y - 3; // has at least three boxes to the bottom
  const has2Bottom1Top =
    Math.floor(index / Y) > 0 && Math.floor(index / Y) < Y - 2; // has at least one box to the top and two boxes to the bottom
  const has1Bottom2Top =
    Math.floor(index / Y) > 1 && Math.floor(index / Y) < Y - 1; // has at least two boxes to the top and one box to the bottom
  const has3Top = Math.floor(index / Y) > 2; // has at least three boxes to the top

  return [
    // horizontal
    has3Right ? [index, index + 1, index + 2, index + 3] : null,
    has2Right1Left ? [index - 1, index, index + 1, index + 2] : null,
    has1Right2Left ? [index - 2, index - 1, index, index + 1] : null,
    has3Left ? [index - 3, index - 2, index - 1, index] : null,
    // vertical
    has3Bottom ? [index, index + 1 * X, index + 2 * X, index + 3 * X] : null,
    has2Bottom1Top
      ? [index - 1 * X, index, index + 1 * X, index + 2 * X]
      : null,
    has1Bottom2Top
      ? [index - 2 * X, index - 1 * X, index, index + 1 * X]
      : null,
    has3Top ? [index - 3 * X, index - 2 * X, index - 1 * X, index] : null,
    // diagonal right to left
    has3Left && has3Bottom // make sure it hase 3 boxes available to bottom and 3 to left
      ? [
          // adjacent 3 boxes to bottom left of index
          index,
          index + 1 * X - 1,
          index + 2 * X - 2,
          index + 3 * X - 3,
        ]
      : null,
    has1Right2Left && has2Bottom1Top // 2 left 1 right available, 2 bottom 1 top available
      ? [
          // adjacent 2 boxes to bottom left of index and 1 box to top right
          index - 1 * X + 1,
          index,
          index + 1 * X - 1,
          index + 2 * X - 2,
        ]
      : null,
    has2Right1Left && has1Bottom2Top // 1 left 2 right available, 1 bottom 2 top available
      ? [
          // adjacent 1 box to bottom left of index and 2 boxes to top right
          index - 2 * X + 2,
          index - 1 * X + 1,
          index,
          index + 1 * X - 1,
        ]
      : null,
    has3Right && has3Top // 3 top 3 right available
      ? [
          // adjacent 3 boxes to top right of index
          index - 3 * X + 3,
          index - 2 * X + 2,
          index - 1 * X + 1,
          index,
        ]
      : null,
    // diagonal left to left
    has3Left && has3Top // make sure it hase 3 boxes available to top and 3 to left
      ? [
          // adjacent 3 boxes to top left of index
          index,
          index - 1 * X - 1,
          index - 2 * X - 2,
          index - 3 * X - 3,
        ]
      : null,
    has1Right2Left && has1Bottom2Top // 2 left 1 right available, 1 bottom 2 top available
      ? [
          // adjacent 2 boxes to top left of index and 1 box to bottom right
          index + 1 * X + 1,
          index,
          index - 1 * X - 1,
          index - 2 * X - 2,
        ]
      : null,
    has2Right1Left && has2Bottom1Top // 1 left 2 right available, 2 bottom 1 top available
      ? [
          // adjacent 1 box to top left of index and 2 boxes to bottom right
          index + 2 * X + 2,
          index + 1 * X + 1,
          index,
          index - 1 * X - 1,
        ]
      : null,
    has3Right && has3Bottom // 3 bottom 3 right available
      ? [
          // adjacent 3 boxes to bottom right of index
          index + 3 * X + 3,
          index + 2 * X + 2,
          index + 1 * X + 1,
          index,
        ]
      : null,
  ].filter((win) => win !== null);
};

export default checkCFWins;
