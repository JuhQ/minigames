import React from "react";

interface TetrominoProps {
  shape: number[][];
  position: { x: number; y: number };
}

const Tetromino: React.FC<TetrominoProps> = ({ shape, position }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: position.y * 20,
        left: position.x * 20,
      }}
    >
      {shape.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={`cell ${cell ? "filled" : ""}`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Tetromino;
