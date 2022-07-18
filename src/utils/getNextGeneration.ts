/**
Каждое следующее поколение рассчитывается на основе предыдущего
 по таким правилам:
в пустой (мёртвой) клетке, с которой соседствуют 
три живые клетки, зарождается жизнь;
если у живой клетки есть две или три живые соседки,
 то эта клетка продолжает жить; в противном случае 
 (если живых соседей меньше двух или больше трёх) 
 клетка умирает («от одиночества» или «от перенаселённости»).
 */
import { getCellAliveNeighborCount } from "./getCellAliveNeighborCount";

export function getNextGeneration(inputField: number[][]): number[][] {
  const resultField: number[][] = [];
  let countAlive = 0;
  for (let row = 0; row < inputField.length; row++) {
    resultField[row] = [];
    for (let col = 0; col < inputField[row].length; col++) {
      resultField[row][col] = inputField[row][col];

      countAlive = getCellAliveNeighborCount(inputField, col, row);

      if (inputField[row][col] === 1 && (countAlive > 3 || countAlive < 2)) {
        resultField[row][col] = 0;
      }
      if (inputField[row][col] === 0 && countAlive === 3) {
        resultField[row][col] = 1;
      }
    }
  }
  return resultField;
}
