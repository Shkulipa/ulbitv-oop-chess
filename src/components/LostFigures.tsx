import { Figure } from "../models/figures/Figure";

interface ILostFiguresProps {
  title: string;
  figures: Figure[];
}

export default function LostFigures({ title, figures }: ILostFiguresProps): JSX.Element {
  return (
    <div className="lost">
      <h3>{title}</h3>
      {figures.map(figure => (
        <div key={figure.id}>
          {figure.name} {figure.logo && <img src={figure.logo} width={20} height={20} alt={figure.name} />}
        </div>
      ))}
    </div>
  )
}
