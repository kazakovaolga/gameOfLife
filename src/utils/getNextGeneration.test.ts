import { getNextGeneration } from "./getNextGeneration";

describe("getNextGeneration", () => {
  it("is a function", () => {
    expect(getNextGeneration).toBeInstanceOf(Function);
  });

  it("calculates next generation 1", () => {
    const field1: Array<Array<number>> = [
      [0, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 1, 0, 0],
    ];

    const field2: Array<Array<number>> = getNextGeneration(field1);

    expect(field2).toEqual([
      [1, 1, 0, 0],
      [1, 1, 1, 0],
      [1, 1, 0, 0],
    ]);
  });

  it("returns new state 2", () => {
    expect(
      getNextGeneration([
        [0, 0],
        [0, 0],
      ])
    ).toEqual([
      [0, 0],
      [0, 0],
    ]);

    expect(
      getNextGeneration([
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ])
    ).toEqual([
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1],
    ]);
  });

  it("returns new state (more cases)", () => {
    expect(
      getNextGeneration([
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
      ])
    ).toEqual([
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ]);

    expect(
      getNextGeneration([
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
      ])
    ).toEqual([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
  });
});
