import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import { Player } from "../models/Player";
import CellComponent from "./CellComponent";

interface IBoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

export default function BoardComponents({ board, setBoard, currentPlayer, swapPlayer }: IBoardProps): JSX.Element {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function click(cell: Cell) {
    if(selectedCell && selectedCell.id !== cell.id && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      swapPlayer();
      setSelectedCell(null);
      updateBoard();
    } else {
      if(cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell);
      }
    }
  }

  useEffect(() => {
    higtlightCells();
  }, [selectedCell]);

  function higtlightCells() {
    board.higtlightCells(selectedCell);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  return (
    <div>
      <h3>Текущий игрок: {currentPlayer?.color}</h3>
      <div className='board'>
        <div className='axis x'>
          <div>x</div>
          <div className="direction">&#10142;</div>
        </div>
        <div className='axis y'>
          <div>y</div>
          <div className="direction">&#10142;</div>
        </div>
        {board.cells.map((row, idx) => 
          <React.Fragment key={idx}>
            {row.map(cell => 
              <CellComponent 
                click={click}
                key={cell.id} 
                cell={cell}
                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
              />
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  )
}
