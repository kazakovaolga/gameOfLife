export function getAllCellsAliveCount(field: number[][]): number {
  let count = 0;
  const cells: number[][] = field;
  const rows: number = cells.length;
  const cols: number = cells[0].length;

  for (let y = 0; y <= rows - 1; y++) {
    for (let x = 0; x <= cols - 1; x++) {
      if (cells[y][x]) {
        count = count + 1;
      }
    }
  }

  return count;
}
