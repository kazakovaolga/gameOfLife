import { renderGameField } from "./renderGameField";
import { getNextGeneration } from "./getNextGeneration";
import { getAllCellsAliveCount } from "./getAllCellsAliveCount";
import { Obj } from "./types";

export function gameOfLife(app: HTMLElement) {
  console.log("gameOfLife");
  console.log("app=", app);
  const el: HTMLElement = app.querySelector("#container") as HTMLElement;

  const obj: Obj = {
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
    // console.log("before cellsNew=", cellsNew);
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

    // console.log("inputX=", ix);
    // console.log("inputY=", iy);

    const cells: number[][] = obj.field;
    // let rows = cells.length;
    // let cols = cells[0].length;
    // console.log("rows=", rows);
    // console.log("cols=", cols);

    for (let y = 0; y <= iy - 1; y++) {
      cellsNew[y] = [];
      // console.log("y=", y);
      // console.log("cellsNew[y]", cellsNew[y]);
      for (let x = 0; x <= ix - 1; x++) {
        cellsNew[y][x] = 0;
        // console.log("x=", x);
        // console.log("cell=", cellsNew[y][x]);
      }
    }
    // console.log("after cirle cellsNew=", cellsNew);

    for (let y = 0; y <= iy - 1; y++) {
      // console.log("y=", y);
      // console.log("1.cells[y]", cells[y]);
      if (cells[y] === undefined) {
        break;
      }
      for (let x = 0; x <= ix - 1; x++) {
        // console.log("x=", x);
        // console.log("cell=", cells[y][x]);
        if (cells[y][x] !== undefined) {
          cellsNew[y][x] = cells[y][x];
        }
        // console.log("check cellsNew[y]", cellsNew[y]);
      }
    }
    // console.log(cellsNew);
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
    console.log("count1=", count);
    let i = 0;

    let timerId = setTimeout(function tick() {
      // console.log("start");
      i = i + 1;
      // console.log("i=", i);
      const newField: number[][] = getNextGeneration(obj.field);
      obj.field = newField;
      renderGameField(obj);
      count = getAllCellsAliveCount(obj.field);
      // console.log("count=", count);
      if (count > 0) {
        timerId = setTimeout(tick, 1000 / speed); // (*)
      } else {
        setTimeout(() => {
          clearInterval(timerId);
          // console.log("stop");
        }, 1000 / speed);
      }
    }, 1000 / speed);
  });
}
