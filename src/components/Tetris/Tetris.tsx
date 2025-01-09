import React, { useCallback, useEffect, useState } from "react";
import { checkCollision, createBoard, getRandomTetromino } from "./utils";

import GameBoard from "./GameBoard";
import Tetromino from "./Tetromino";

interface Tetromino {
  shape: number[][];
  color: string;
}

// TODO: does not work
const Tetris: React.FC = () => {
  const [board, setBoard] = useState(createBoard());
  const [tetromino, setTetromino] = useState<Tetromino>(getRandomTetromino());
  const [position, setPosition] = useState({ x: 3, y: 0 });
  const [gameOver, setGameOver] = useState(false);

  const moveTetromino = useCallback(
    (direction: number) => {
      const newPosition = { ...position, x: position.x + direction };
      if (!checkCollision(tetromino.shape, board, newPosition)) {
        setPosition(newPosition);
      }
    },
    [position, tetromino.shape, board],
  );

  const dropTetromino = useCallback(() => {
    const newPosition = { ...position, y: position.y + 1 };
    if (!checkCollision(tetromino.shape, board, newPosition)) {
      setPosition(newPosition);
    } else {
      // Lock the tetromino and generate a new one
      const newBoard = [...board];
      tetromino.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell !== 0) {
            newBoard[position.y + y][position.x + x] = cell;
          }
        });
      });
      setBoard(newBoard);
      setTetromino(getRandomTetromino());
      setPosition({ x: 3, y: 0 });

      if (checkCollision(tetromino.shape, newBoard, { x: 3, y: 0 })) {
        setGameOver(true);
      }
    }
  }, [position, tetromino.shape, board]);

  const rotateTetromino = useCallback(() => {
    const rotatedTetromino = tetromino.shape
      .map((_, index) => tetromino.shape.map((col) => col[index]))
      .reverse();

    const newPosition = { ...position };

    if (!checkCollision(rotatedTetromino, board, newPosition)) {
      setTetromino({
        ...tetromino,
        shape: rotatedTetromino,
      });
    }
  }, [tetromino, position, board]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          moveTetromino(-1);
          break;
        case "ArrowRight":
          moveTetromino(1);
          break;
        case "ArrowDown":
          dropTetromino();
          break;
        case "ArrowUp":
          rotateTetromino();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dropTetromino, moveTetromino, rotateTetromino]);

  useEffect(() => {
    const interval = setInterval(() => {
      dropTetromino();
    }, 1000);

    return () => clearInterval(interval);
  }, [dropTetromino]);

  return (
    <div className="game">
      {gameOver ? <div className="game-over">Game Over</div> : null}
      <GameBoard board={board} />
      <Tetromino shape={tetromino.shape} position={position} />
    </div>
  );
};

export default Tetris;
