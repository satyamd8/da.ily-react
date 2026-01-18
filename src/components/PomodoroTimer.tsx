import { useEffect, useRef, useState } from "react";
import replayIcon from "../assets/replay.svg";
import playIcon from "../assets/play.svg";
import lamp from "../assets/lamp.mp3";

const STAGES = ["study", "break", "long break"];

const PomodoroTimer = () => {
   const [stagesTime, setStagesTime] = useState(["25:00", "05:00", "15:00"]);
   const [index, setIndex] = useState(0);
   const [timeLeft, setTimeLeft] = useState(25 * 60);
   const [pomodoroCount, setPomodoroCount] = useState(0);

   const intervalRef = useRef<number | null>(null);
   const timerEndRef = useRef<HTMLAudioElement | null>(null);

   /* ---------------- INIT ---------------- */
   useEffect(() => {
      initializeTimer();
   }, [index, stagesTime]);

   useEffect(() => {
      document.title = `${formatTime(timeLeft)} | ${capitalize(STAGES[index])}`;
   }, [timeLeft, index]);

   /* ---------------- TIMER CORE ---------------- */
   const playPause = () => {
      if (intervalRef.current) {
         clearInterval(intervalRef.current);
         intervalRef.current = null;
         return;
      }

      intervalRef.current = window.setInterval(() => {
         setTimeLeft((prev) => {
            if (prev > 0) return prev - 1;

            handleStageEnd();
            return prev;
         });
      }, 1000);
   };

   const reset = () => {
      clearInterval(intervalRef.current!);
      intervalRef.current = null;
      initializeTimer();
   };

   /* ---------------- STAGE LOGIC ---------------- */
   const advanceFromStudy = () => {
      setPomodoroCount((count) => {
         const newCount = count + 1;
         const nextIndex = newCount % 4 === 0 ? 2 : 1;
         setIndex(nextIndex);
         return newCount;
      });
   };

   const handleStageEnd = () => {
      const mute = localStorage.getItem("muteSound") === "true";
      if (!mute && timerEndRef.current) {
         timerEndRef.current.volume = 0.25;
         timerEndRef.current.play();
      }

      clearInterval(intervalRef.current!);
      intervalRef.current = null;

      if (STAGES[index] === "study") {
         advanceFromStudy();
      } else {
         if (STAGES[index] === "long break") {
            setPomodoroCount(0);
         }
         setIndex(0);
      }
   };

   /* ---------------- TIME ADJUST ---------------- */
   const adjustTime = (type: "min" | "sec", value: number) => {
      let [min, sec] = parseTime(stagesTime[0]);

      if (type === "min") {
         min = Math.max(0, min + value);
      } else {
         sec += value * 5;
         if (sec >= 60) {
            sec = 0;
            min++;
         } else if (sec < 0) {
            if (min > 0) {
               sec = 55;
               min--;
            } else sec = 0;
         }
      }

      const studySeconds = min * 60 + sec;
      const shortBreak = Math.floor(studySeconds * 0.2);
      const longBreak = Math.floor(studySeconds * 0.6);

      const updated = [
         formatTime(studySeconds),
         formatTime(shortBreak),
         formatTime(longBreak),
      ];

      setStagesTime(updated);

      if (STAGES[index] === "study") {
         setTimeLeft(studySeconds);
      }
   };

   /* ---------------- STAGE SWITCH ---------------- */
   const switchToStage = (stageIndex: number) => {
      clearInterval(intervalRef.current!);
      intervalRef.current = null;
      setIndex(stageIndex);
   };

   const nextStage = () => {
      clearInterval(intervalRef.current!);
      intervalRef.current = null;

      if (STAGES[index] === "study") {
         advanceFromStudy();
      } else {
         if (STAGES[index] === "long break") {
            setPomodoroCount(0);
         }
         setIndex(0);
      }
   };

   const prevStage = () => {
      clearInterval(intervalRef.current!);
      intervalRef.current = null;

      if (STAGES[index] === "study") {
         // preserve cycle context
         if (pomodoroCount > 0) {
            setIndex(1); // short break
         } else {
            setIndex(2); // long break (before first cycle)
         }
      } else {
         setIndex(0); // go back to study
      }
   };

   /* ---------------- HELPERS ---------------- */
   function initializeTimer() {
      const [m, s] = parseTime(stagesTime[index]);
      setTimeLeft(m * 60 + s);
   }

   function toggleFullscreen() {
      if (!document.fullscreenElement) {
         document.documentElement.requestFullscreen();
      } else {
         document.exitFullscreen();
      }
   }

   /* ---------------- JSX ---------------- */
   return (
      <>
         <audio
            ref={timerEndRef}
            id="timer-end"
            src={lamp}
            preload="auto"
         />

         <div className="timer-section">
            <div className="stages" id="stages-bar">
               {STAGES.map((stage, i) => (
                  <span
                     key={stage}
                     className={`stage-name ${i === index ? "active" : ""}`}
                     onClick={() => switchToStage(i)}
                  >
                     {stage}
                  </span>
               ))}
            </div>

            <div className="timer">
               <div className="clock-display">
                  <h1 className="clock">{formatTime(timeLeft)}</h1>
               </div>

               <div className="adjust">
                  <div className="time-adjust">
                     <button onClick={() => adjustTime("min", 1)}>▲</button>
                     <p className="minutes-label">min</p>
                     <button onClick={() => adjustTime("min", -1)}>▼</button>
                  </div>

                  <div className="time-adjust">
                     <button onClick={() => adjustTime("sec", 1)}>▲</button>
                     <p className="seconds-label">sec</p>
                     <button onClick={() => adjustTime("sec", -1)}>▼</button>
                  </div>
               </div>
            </div>

            <div className="buttons">
               <button onClick={reset}>
                  <img
                     src={replayIcon}
                     className="replay_button"
                  />
               </button>

               <button onClick={playPause}>
                  <img
                     src={playIcon}
                     className="playpause_button"
                  />
               </button>
            </div>

            <div className="stage-buttons">
               <button onClick={prevStage}>⏮️ Prev</button>
               <button onClick={nextStage}>Next ⏭️</button>
               <button id="focus" onClick={toggleFullscreen}>
                  Focus
               </button>
            </div>
         </div>
      </>
   );
};

export default PomodoroTimer;

/* ---------------- UTILS ---------------- */
function parseTime(time: string): [number, number] {
   const [m, s] = time.split(":").map(Number);
   return [m, s];
}

function formatTime(seconds: number) {
   const m = Math.floor(seconds / 60);
   const s = seconds % 60;
   return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function capitalize(str: string) {
   return str[0].toUpperCase() + str.slice(1);
}
