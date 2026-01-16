import Navbar from "../../components/Navbar";
import PomodoroTimer from "../../components/PomodoroTimer";
import "./tools.css";

const Tools = () => {
   return (
      <div className="tools-page">
         <header>
            <h3>da.ily</h3>
            <Navbar />
         </header>
         <main>
            <div className="header">
               <h1>Pomodoro Timer</h1>
            </div>

            <PomodoroTimer />

            <div className="tools">
               <div className="music">
                  <iframe
                     style={{ borderRadius: "12px" }}
                     src="https://open.spotify.com/embed/album/3mH6qwIy9crq0I9YQbOuDf?utm_source=generator"
                     width="80%"
                     height="80"
                     frameBorder="0"
                     allowFullScreen
                     allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                     loading="lazy"
                  ></iframe>
                  <iframe
                     className="yt"
                     style={{ borderRadius: "12px" }}
                     id="youtubePlayer"
                     width="60%"
                     height="150"
                     src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1"
                     frameBorder="0"
                     allow="autoplay"
                     allowFullScreen
                  ></iframe>
               </div>
               <div className="notes">
                  <textarea
                     id="note"
                     name="note"
                     placeholder="Enter your notes here..."
                  ></textarea>
               </div>
            </div>
         </main>
      </div>
   );
};

export default Tools;
