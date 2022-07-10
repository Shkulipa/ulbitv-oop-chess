import { Cell } from "../models/Cell";

interface ICellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

export default function CellComponent({ cell, selected, click }: ICellProps): JSX.Element {
  return (
    <div 
      className={[
        'cell', 
        cell.color, 
        selected ? "selected" : ""
      ].join(' ')}
      onClick={() => click(cell)}
      style={{ background: cell.available && cell.figure ? "green" : '' }}
    >
      <div className="cordinates">{cell.x} {cell.y}</div>
      {cell.available && !cell.figure && <div className="availabe" />}
      {cell.figure?.logo && <img src={cell.figure.logo} alt={cell.figure.name}/>}
    </div>
  )
}
