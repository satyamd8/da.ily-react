import { useState, useEffect, useRef } from "react";

type Props = {
   disabled?: boolean; // no active task selected
   onStop: (seconds: number) => void; // report elapsed time
};

export default function Stopwatch({ disabled = false, onStop }: Props) {
   const [running, setRunning] = useState(false);
   const [seconds, setSeconds] = useState(0);

   const startTimeRef = useRef<number | null>(null);
   const rafRef = useRef<number | null>(null);

   const formatTime = (total: number) => {
      const h = Math.floor(total / 3600)
         .toString()
         .padStart(2, "0");
      const m = Math.floor((total % 3600) / 60)
         .toString()
         .padStart(2, "0");
      const s = (total % 60).toString().padStart(2, "0");
      return `${h}:${m}:${s}`;
   };

   const tick = () => {
      if (!startTimeRef.current) return;

      const now = Date.now();
      const elapsed = Math.floor((now - startTimeRef.current) / 1000);
      setSeconds(elapsed);
      rafRef.current = requestAnimationFrame(tick);
   };

   const handleStartPause = () => {
      if (disabled) return;

      if (!running) {
         startTimeRef.current = Date.now() - seconds * 1000;
         setRunning(true);
         rafRef.current = requestAnimationFrame(tick);
      } else {
         setRunning(false);
         if (rafRef.current) cancelAnimationFrame(rafRef.current);
      }
   };

   const handleStop = () => {
      if (!running && seconds === 0) return;

      setRunning(false);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      onStop(seconds);
      setSeconds(0);
      startTimeRef.current = null;
   };

   const handleReset = () => {
      setRunning(false);
      setSeconds(0);
      startTimeRef.current = null;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
   };

   useEffect(() => {
      return () => {
         if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
   }, []);

   return (
      <section className="stopwatch-section">
         <h2>da.ily Stopwatch</h2>

         <div className="stopwatch-display">
            <p>Keep track of your tasks using a stopwatch :)</p>
            <div id="stopwatch-display">{formatTime(seconds)}</div>
         </div>

         <div className="stopwatch-controls">
            <button onClick={handleStartPause} disabled={disabled}>
               {running ? "Pause" : "Start"}
            </button>

            <button onClick={handleStop} disabled={disabled}>
               Stop
            </button>

            <button onClick={handleReset}>Reset</button>
         </div>
      </section>
   );
}
