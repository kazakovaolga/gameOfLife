export interface GameField {
  el: HTMLDivElement;
  field: number[][];
  onClick: (x: number, y: number) => void;
}

export interface Coord {
  x: number;
  y: number;
}
