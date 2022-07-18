import { gameOfLife } from "./gameOfLife";
import { Coord } from "./types";

// jest.useFakeTimers();
const setTime = jest.spyOn(global, "setTimeout");

describe("gameOfLife", () => {
  let app: HTMLDivElement;
  let el: HTMLDivElement;
  let btnStop: HTMLButtonElement;
  let btnChange: HTMLButtonElement;
  let btnStart: HTMLButtonElement;
  let inputX: HTMLInputElement;
  let inputY: HTMLInputElement;
  let inputSpeed: HTMLInputElement;

  beforeEach(() => {
    app = document.createElement("div");
    app.id = "app";
    el = document.createElement("div");
    el.id = "container";
    app.appendChild(el);

    btnStart = document.createElement("button");
    btnStart.classList.add("start");
    app.appendChild(btnStart);

    btnStop = document.createElement("button");
    btnStop.classList.add("stop");
    app.appendChild(btnStop);

    btnChange = document.createElement("button");
    btnChange.classList.add("change");
    app.appendChild(btnChange);

    inputX = document.createElement("input");
    inputX.classList.add("inputX");
    app.appendChild(inputX);

    inputY = document.createElement("input");
    inputY.classList.add("inputY");
    app.appendChild(inputY);

    inputSpeed = document.createElement("input");
    inputSpeed.classList.add("inputSpeed");
    app.appendChild(inputSpeed);
  });

  it("renders field", () => {
    gameOfLife(app);
    expect(getFieldFromElement(el)).toEqual([
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ]);
  });

  it("re-renders field", () => {
    gameOfLife(app);
    clickCell(el, { x: 1, y: 1 });
    expect(getFieldFromElement(el)).toEqual([
      [0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ]);
    clickCell(el, { x: 1, y: 2 });
    expect(getFieldFromElement(el)).toEqual([
      [0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ]);
  });

  it("stop game", () => {
    gameOfLife(app);
    for (let i = 0; i < 7; i++) {
      clickCell(el, { x: i, y: i });
    }
    expect(getFieldFromElement(el)).toEqual([
      [1, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 1],
    ]);
    btnStop.click();
    expect(getFieldFromElement(el)).toEqual([
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ]);
  });

  it("change field size 7=>3", () => {
    inputX.value = "3";
    inputY.value = "3";
    gameOfLife(app);
    expect(getFieldFromElement(el)).toEqual([
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ]);
    btnChange.click();
    expect(getFieldFromElement(el)).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });

  it("change field size 7=>9", () => {
    inputX.value = "9";
    inputY.value = "9";
    gameOfLife(app);
    for (let i = 0; i < 7; i++) {
      clickCell(el, { x: i, y: i });
    }
    expect(getFieldFromElement(el)).toEqual([
      [1, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 1],
    ]);
    btnChange.click();
    expect(getFieldFromElement(el)).toEqual([
      [1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });

  it("start game", () => {
    inputSpeed.value = "3";
    gameOfLife(app);
    for (let i = 0; i < 7; i++) {
      clickCell(el, { x: i, y: i });
    }
    expect(getFieldFromElement(el)).toEqual([
      [1, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 1],
    ]);
    btnStart.click();
  });

  it("waits before next step of the game", () => {
    inputX.value = "9";
    inputY.value = "9";
    gameOfLife(app);
    btnChange.click();

    clickCell(el, { x: 4, y: 3 });
    clickCell(el, { x: 3, y: 4 });
    clickCell(el, { x: 4, y: 4 });
    clickCell(el, { x: 5, y: 4 });

    inputSpeed.value = "3";
    const speed = Number(inputSpeed.value);
    gameOfLife(app);

    btnStart.click();
    expect(setTime).toHaveBeenLastCalledWith(
      expect.any(Function),
      1000 / speed
    );
  });
});

function clickCell(el: HTMLDivElement, coordinates: Coord) {
  const cell = el.querySelector(
    `[data-x="${coordinates.x}"][data-y="${coordinates.y}"]`
  ) as HTMLDivElement;
  cell.click();
}

function getFieldFromElement(el: HTMLDivElement) {
  const cells: number[][] = [];
  el.querySelectorAll(".cell").forEach((el) => {
    const x = Number(el.getAttribute("data-x"));
    const y = Number(el.getAttribute("data-y"));
    cells[y] = cells[y] || [];
    cells[y][x] = Number(el.classList.contains("alive"));
  });
  return cells;
}
