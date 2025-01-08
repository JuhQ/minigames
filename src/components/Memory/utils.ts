export const getColumnCount = (n: number): number => {
  const thresholds = [20, 16, 12, 7, 6, 4, 2];
  const values = [10, 9, 8, 7, 6, 4, 3];
  for (let i = 0; i < thresholds.length; i++) {
    if (n > thresholds[i]) return values[i];
  }
  return 2;
};

export const generateRandomHex = (): string =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
