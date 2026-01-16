import Home from "./pages/home/Home"
import Tracker from "./pages/tracker/Tracker"
import Tools from "./pages/tools/Tools"
import Schedule from "./pages/schedule/Schedule"
import Profile from "./pages/profile/Profile"
import './App.css'

import { Route, Routes} from "react-router-dom"
import { useEffect, useRef } from "react"
import click from './assets/click.mp3'

function App() {
  //handles sitewide click audio
  const clickRef = useRef(new Audio(click));

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const isClickable =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'SPAN' ||
        target.closest('button') ||
        target.closest('a');

      if (isClickable) {
        const sound = clickRef.current;
        sound.currentTime = 0;
        sound.volume = 0.4;
        sound.playbackRate = 1.1;
        sound.play().catch(err => console.log("Sound playback blocked:", err));
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App