// import { number } from "yargs";
import { Obj } from "./types";

export { renderGameField };

const renderGameField = (obj: Obj) => {
  console.log("obj.el");
  const el: HTMLElement = obj.el;
  const cells: number[][] = obj.field;
  const rows: number = cells.length;
  const cols: number = cells[0].length;

  el.innerHTML = "";
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const iDiv: HTMLElement = document.createElement("div");
      iDiv.classList.add("cell");

      if (cells[y][x]) {
        iDiv.classList.add("alive");
      } else {
        iDiv.classList.add("dead");
      }

      iDiv.setAttribute("data-x", `${x}`);
      iDiv.setAttribute("data-y", `${y}`);

      iDiv.addEventListener("click", () => {
        obj.onClick(x, y);
      });

      el.appendChild(iDiv);
    }
    el.appendChild(document.createElement("br"));
  }
};
