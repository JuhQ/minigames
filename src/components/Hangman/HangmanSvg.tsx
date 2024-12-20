import { memo } from "react";

interface Props {
  incorrectGuesses: number;
  fill?: string;
  width?: number;
  height?: number;
}

const HangmanSvg = ({
  incorrectGuesses,
  fill = "white",
  width = 200,
  height = 200,
}: Props): JSX.Element => {
  const baseWidth = width / 200; // assuming default width is 200
  const baseHeight = height / 200; // assuming default height is 200

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x={10 * baseWidth}
        y={180 * baseHeight}
        width={180 * baseWidth}
        height={20 * baseHeight}
        fill={fill}
      />
      <rect
        x={10 * baseWidth}
        y={20 * baseHeight}
        width={10 * baseWidth}
        height={160 * baseHeight}
        fill={fill}
      />
      <rect
        x={10 * baseWidth}
        y={20 * baseHeight}
        width={70 * baseWidth}
        height={10 * baseHeight}
        fill={fill}
      />
      <line
        x1={45 * baseWidth}
        y1={30 * baseHeight}
        x2={45 * baseWidth}
        y2={60 * baseHeight}
        stroke={fill}
        strokeWidth={5 * baseWidth}
      />
      {incorrectGuesses > 0 && (
        <circle
          cx={45 * baseWidth}
          cy={75 * baseHeight}
          r={15 * baseWidth}
          fill={fill}
        />
      )}
      {incorrectGuesses > 1 && (
        <line
          x1={45 * baseWidth}
          y1={90 * baseHeight}
          x2={45 * baseWidth}
          y2={130 * baseHeight}
          stroke={fill}
          strokeWidth={5 * baseWidth}
        />
      )}
      {incorrectGuesses > 2 && (
        <line
          x1={45 * baseWidth}
          y1={105 * baseHeight}
          x2={30 * baseWidth}
          y2={90 * baseHeight}
          stroke={fill}
          strokeWidth={5 * baseWidth}
        />
      )}
      {incorrectGuesses > 3 && (
        <line
          x1={45 * baseWidth}
          y1={105 * baseHeight}
          x2={60 * baseWidth}
          y2={90 * baseHeight}
          stroke={fill}
          strokeWidth={5 * baseWidth}
        />
      )}
      {incorrectGuesses > 4 && (
        <line
          x1={45 * baseWidth}
          y1={130 * baseHeight}
          x2={30 * baseWidth}
          y2={145 * baseHeight}
          stroke={fill}
          strokeWidth={5 * baseWidth}
        />
      )}
      {incorrectGuesses > 5 && (
        <line
          x1={45 * baseWidth}
          y1={130 * baseHeight}
          x2={60 * baseWidth}
          y2={145 * baseHeight}
          stroke={fill}
          strokeWidth={5 * baseWidth}
        />
      )}
    </svg>
  );
};

export default memo(HangmanSvg);
