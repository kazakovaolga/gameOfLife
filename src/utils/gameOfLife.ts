import { renderGameField } from "./renderGameField";
import { getNextGeneration } from "./getNextGeneration";
import { getAllCellsAliveCount } from "./getAllCellsAliveCount";
import { GameField } from "./types";

export function gameOfLife(app: HTMLDivElement) {
  const el: HTMLDivElement = app.querySelector("#container") as HTMLDivElement;

  const obj: GameField = {
    el,
    field: [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ],
    onClick: (x: number, y: number) => {
      obj.field[y][x] = +!obj.field[y][x];
      renderGameField(obj);
    },
  };
  renderGameField(obj);

  const btnStop: HTMLButtonElement = app.querySelector(
    ".stop"
  ) as HTMLButtonElement;
  btnStop.addEventListener("click", () => {
    const cells: number[][] = obj.field;
    const rows: number = cells.length;
    const cols: number = cells[0].length;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        obj.field[y][x] = 0;
      }
    }
    renderGameField(obj);
  });

  const btnChange = app.querySelector(".change") as HTMLButtonElement;
  btnChange.addEventListener("click", () => {
    const cellsNew: number[][] = [];
    const inputX: HTMLInputElement = app.querySelector(
      ".inputX"
    ) as HTMLInputElement;
    const ix = Number(inputX.value);
    inputX.value = "";
    const inputY: HTMLInputElement = app.querySelector(
      ".inputY"
    ) as HTMLInputElement;
    const iy = Number(inputY.value);
    inputY.value = "";
    const cells: number[][] = obj.field;

    for (let y = 0; y <= iy - 1; y++) {
      cellsNew[y] = [];
      for (let x = 0; x <= ix - 1; x++) {
        cellsNew[y][x] = 0;
      }
    }

    for (let y = 0; y <= iy - 1; y++) {
      if (cells[y] === undefined) {
        break;
      }
      for (let x = 0; x <= ix - 1; x++) {
        if (cells[y][x] !== undefined) {
          cellsNew[y][x] = cells[y][x];
        }
      }
    }
    obj.field = cellsNew;
    renderGameField(obj);
  });

  const btnStart: HTMLButtonElement = app.querySelector(
    ".start"
  ) as HTMLButtonElement;
  btnStart.addEventListener("click", () => {
    const inputSpeed: HTMLInputElement = app.querySelector(
      ".inputSpeed"
    ) as HTMLInputElement;
    let speed = Number(inputSpeed.value);
    if (speed === 0) speed = 1;
    let count: number = getAllCellsAliveCount(obj.field);
    let i = 0;

    let timerId = setTimeout(function tick() {
      i = i + 1;
      const newField: number[][] = getNextGeneration(obj.field);
      obj.field = newField;
      renderGameField(obj);
      count = getAllCellsAliveCount(obj.field);
      if (count > 0) {
        timerId = setTimeout(tick, 1000 / speed);
      } else {
        setTimeout(() => {
          clearInterval(timerId);
        }, 1000 / speed);
      }
    }, 1000 / speed);
  });
}
