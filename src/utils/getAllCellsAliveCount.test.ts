import { getAllCellsAliveCount } from "./getAllCellsAliveCount";

describe("getAllCellsAliveCount", () => {
  let field: Array<Array<number>>;
  beforeEach(() => {
    field = [
      [0, 0, 0, 1],
      [0, 1, 0, 1],
      [0, 1, 1, 1],
    ];
  });

  it("is a function", () => {
    expect(getAllCellsAliveCount).toBeInstanceOf(Function);
  });

  it("checking the number of all active cells", () => {
    expect(getAllCellsAliveCount(field)).toEqual(6);
  });
});
