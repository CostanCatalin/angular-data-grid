function easeInExpo(x: number): number {
  return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
}

function easeInOutQuad(x: number): number {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

function easeOutCirc(x: number): number {
  return Math.sqrt(1 - Math.pow(x - 1, 2));
}

function easeInBack(x: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;

  return c3 * x * x * x - c1 * x * x;
}

// this one made me chuckle so I had to put it here
function easeOutBounce(x: number): number {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
}

// Easing functions from https://easings.net/
export const EASING_FUNCTIONS = [
  easeInExpo, easeInOutQuad, easeOutCirc, easeOutBounce
];

export enum Direction {
  None = "NONE",
  Asceding = "ASC",
  Descending = "DESC"
};

export type SortEvent = {
  columnName: string,
  direction: string
}

export type PaginationEvent = {
  currentPage: number,
  pageSize: number | null
}
