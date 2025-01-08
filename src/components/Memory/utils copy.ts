export const getColumnCount = (n: number): number => {
  if (n > 20) {
    return 10;
  }

  if (n > 16) {
    return 9;
  }

  if (n > 12) {
    return 8;
  }

  if (n > 7) {
    return 7;
  }

  if (n >= 6) {
    return 6;
  }

  if (n >= 4) {
    return 4;
  }

  if (n >= 2) {
    return 3;
  }

  return 2;
};

export const generateRandomHex = (): string =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
