import { useEffect } from "react";
import { useRef, useState } from "react";
import { Colors } from "../models/Colors";
import { Player } from "../models/Player";

interface ITimerProps {
  currentPlayer: Player | null;
  restart: () => void;
}

export default function Timer({ currentPlayer, restart }: ITimerProps): JSX.Element {
  const [blackTime, setBlackTime] = useState(300);
  const [whiteTime, setWhiteTime] = useState(300);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    startTimer();
  }, [currentPlayer])

  function startTimer() {
    if(timer.current) clearInterval(timer.current);
    const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
    timer.current = setInterval(callback, 1000);
  }

  function decrementBlackTimer() {
    setBlackTime(s => s - 1)
  }

  function decrementWhiteTimer() {
    setWhiteTime(s => s - 1)
  }

  function handleRestart() {
    setWhiteTime(300);
    setBlackTime(300);
    restart();
  }

  return (
    <div>
      <div>
        <button onClick={handleRestart}>Restart game</button>
      </div>
      <h2>Черные - {blackTime}</h2>
      <h2>Белые - {whiteTime}</h2>
    </div>
  )
}
