export const checkCollision = (
  tetromino: number[][],
  board: number[][],
  position: { x: number; y: number },
): boolean => {
  for (let y = 0; y < tetromino.length; y++) {
    for (let x = 0; x < tetromino[y].length; x++) {
      if (tetromino[y][x] !== 0 && (!board[position.y + y] ||
                !board[position.y + y][position.x + x] ||
                board[position.y + y][position.x + x] !== 0)) {
            return true;
      }

    }
  }
  return false;
};

export const createBoard = (): number[][] => {
  return Array.from({ length: 20 }, () => Array(10).fill(0));
};

export const TETROMINOS = {
  0: { shape: [[0]], color: "0, 0, 0" },
  I: { shape: [[1, 1, 1, 1]], color: "80, 227, 230" },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: "36, 95, 223",
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: "223, 173, 36",
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "223, 217, 36",
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "48, 211, 56",
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: "132, 61, 198",
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "227, 78, 78",
  },
};

export const getRandomTetromino = (): { shape: number[][]; color: string } => {
  const tetrominos: Array<keyof typeof TETROMINOS> = [
    "I",
    "J",
    "L",
    "O",
    "S",
    "T",
    "Z",
  ];
  const randTetromino =
    tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return TETROMINOS[randTetromino];
};
