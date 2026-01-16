import { Link } from "react-router-dom";

import NavbarHome from "../../components/NavbarHome";
import SettingsModal from "../../components/SettingsModal";
import "./home.css";

import { useState } from "react";

export default function Home() {
   const [modalIsOpen, openModal] = useState(false);

   window.addEventListener("click", (e) => {
      if (e.target === document.getElementById("settings")) {
         openModal(false);
      }
   });

   return (
      <div className="home">
         <audio id="click-sound" src="../../assets/click.mp3" preload="auto"></audio>
      
         <header>
            <h3>da.ily</h3>
            <NavbarHome />
         </header>

         <div className="welcome">
            <h1>
               Welcome <br />
               &nbsp;&nbsp;&nbsp;&nbsp; to <span id="daily">da.ily</span>
            </h1>

            <div className="buttons">
               <Link to="/tracker">
                  <button>Start Studying</button>
               </Link>
               <button id="open-settings" onClick={() => openModal(true)}>
                  Customize
               </button>
            </div>
         </div>

         <SettingsModal isOpen={modalIsOpen} onClose={() => openModal(false)} />

         <footer>
            <h2>Stay focused. Stay organized. Study your way.</h2>
         </footer>
      </div>
   );
}
