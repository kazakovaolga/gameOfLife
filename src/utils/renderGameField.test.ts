// import { objectExpression } from "@babel/types";
import { renderGameField } from "./renderGameField";

describe("renderGameField", () => {
  const container = document.createElement("div") as HTMLElement;
  const onClick = jest.fn();

  it("is a function", () => {
    expect(renderGameField).toBeInstanceOf(Function);
  });

  it("renders field", () => {
    const cells: number[][] = [
      [0, 0, 1],
      [0, 1, 1],
      [1, 1, 1],
    ];
    renderGameField({
      el: container,
      field: cells,
      onClick,
    });
    expect(container.querySelectorAll(".cell").length).toBe(9);
    expect(container.querySelectorAll(".cell.alive").length).toBe(6);
    expect(container.querySelectorAll(".cell.dead").length).toBe(3);

    expect(container.querySelector('.cell.alive[data-x="0"][data-y="0"]')).toBe(
      null
    );
    expect(
      container.querySelector('.cell.dead[data-x="0"][data-y="0"]')
    ).not.toBe(null);
  });

  it("updates field", () => {
    renderGameField({
      el: container,
      field: [
        [0, 0, 1],
        [0, 1, 1],
        [1, 1, 1],
      ],
      onClick,
    });
    renderGameField({
      el: container,
      field: [
        [1, 0, 0, 1],
        [1, 0, 1, 1],
        [1, 0, 0, 0],
      ],
      onClick,
    });
    expect(container.querySelectorAll(".cell").length).toBe(12);
    expect(container.querySelectorAll(".cell.alive").length).toBe(6);
    expect(container.querySelectorAll(".cell.dead").length).toBe(6);
  });

  it("notifies about cell click", () => {
    renderGameField({
      el: container,
      field: [
        [0, 0, 1],
        [0, 1, 1],
        [1, 1, 1],
      ],
      onClick,
    });
    const cellDead = container.querySelector(".cell.dead") as HTMLElement;
    cellDead.click();
    expect(onClick).toHaveBeenCalledWith(0, 0);

    const cellAlive = container.querySelector(".cell.alive") as HTMLElement;
    cellAlive.click();
    expect(onClick).toHaveBeenCalledWith(2, 0);

    const cellCoord = container.querySelector(
      ".cell[data-x='2'][data-y='2']"
    ) as HTMLElement;
    cellCoord.click();
    expect(onClick).toHaveBeenCalledWith(2, 2);
  });
});
