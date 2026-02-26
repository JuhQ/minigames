import "./GameBoard.css";

interface GameBoardProps {
  board: number[][];
}

const GameBoard: React.FC<GameBoardProps> = ({ board }) => {
  return (
    <div className="game-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
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

export default GameBoard;
