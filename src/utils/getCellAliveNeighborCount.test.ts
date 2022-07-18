import { getCellAliveNeighborCount } from "./getCellAliveNeighborCount";

describe("getCellAliveNeighborCount", () => {
  let field: number[][];
  beforeEach(() => {
    field = [
      [0, 0, 0, 1],
      [0, 1, 0, 1],
      [0, 1, 1, 1],
    ];
  });

  it("is a function", () => {
    expect(getCellAliveNeighborCount).toBeInstanceOf(Function);
  });

  const arr = [
    { x: 0, y: 0, expectedResult: 1 },
    { x: 1, y: 0, expectedResult: 1 },
    { x: 2, y: 0, expectedResult: 3 },
    { x: 3, y: 0, expectedResult: 1 },
    { x: 0, y: 1, expectedResult: 2 },
    { x: 1, y: 1, expectedResult: 2 },
    { x: 2, y: 1, expectedResult: 6 },
    { x: 3, y: 1, expectedResult: 3 },
    { x: 0, y: 2, expectedResult: 2 },
    { x: 1, y: 2, expectedResult: 2 },
    { x: 2, y: 2, expectedResult: 4 },
    { x: 3, y: 2, expectedResult: 2 },
  ];

  arr.forEach(({ x, y, expectedResult }) =>
    it(`expect to have ${expectedResult} alive neighbors for coordinates (x: ${x}, y: ${y})`, () => {
      expect(getCellAliveNeighborCount(field, x, y)).toBe(expectedResult);
    })
  );
});
