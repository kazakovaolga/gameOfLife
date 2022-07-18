export function getCellAliveNeighborCount(
  field: number[][],
  x: number,
  y: number
): number {
  let count = 0;

  for (let col = x - 1; col <= x + 1; col++) {
    for (let row = y - 1; row <= y + 1; row++) {
      if (col === x && row === y) {
        continue;
      }
      if (field[row] === undefined) {
        continue;
      }

      const isAlive = Boolean(field[row][col]);
      count = count + Number(isAlive);
    }
  }

  return count;
}
