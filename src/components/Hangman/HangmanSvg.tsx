import { memo } from "react";

interface Props {
  incorrectGuesses: number;
  fill?: string;
}

const HangmanSvg = ({
  incorrectGuesses,
  fill = "white"
}: Props): JSX.Element => (
  <svg
    width="200"
    height="200"
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="10" y="180" width="180" height="20" fill={fill} />
    <rect x="10" y="20" width="10" height="160" fill={fill} />
    <rect x="10" y="20" width="70" height="10" fill={fill} />
    <line x1="45" y1="30" x2="45" y2="60" stroke={fill} strokeWidth="5" />
    {incorrectGuesses > 0 && <circle cx="45" cy="75" r="15" fill={fill} />}
    {incorrectGuesses > 1 && (
      <line x1="45" y1="90" x2="45" y2="130" stroke={fill} strokeWidth="5" />
    )}
    {incorrectGuesses > 2 && (
      <line x1="45" y1="105" x2="30" y2="90" stroke={fill} strokeWidth="5" />
    )}
    {incorrectGuesses > 3 && (
      <line x1="45" y1="105" x2="60" y2="90" stroke={fill} strokeWidth="5" />
    )}
    {incorrectGuesses > 4 && (
      <line x1="45" y1="130" x2="30" y2="145" stroke={fill} strokeWidth="5" />
    )}
    {incorrectGuesses > 5 && (
      <line x1="45" y1="130" x2="60" y2="145" stroke={fill} strokeWidth="5" />
    )}
  </svg>
);

export default memo(HangmanSvg);
