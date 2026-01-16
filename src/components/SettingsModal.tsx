type Props = {
   isOpen: boolean;
   onClose: () => void;
}

function SettingsModal( {isOpen, onClose}: Props) {
   return (
      <div className={`settings ${isOpen ? "open" : ""}`} id="settings">
         <div className="settings-inner">
            <span className="close" onClick={onClose}>&times;</span>

            <h2 className="title">Settings</h2>

            <div className="item">
               <label htmlFor ="theme">Themes:</label>
                  <select id="theme" name="theme">
                     <option value="dawn">Dawn </option>
                     <option value="water">Water</option>
                     <option value="earth">Earth</option>
                     <option value="sunset">Sunset</option>
                  </select>
            </div>

            <div className="item">
               <label htmlFor="font">Font:</label>
                  <select id="font" name="font">
                     <option value="Quicksand">Quicksand </option>
                     <option value="Outfit">Outfit</option>
                     <option value="Inter">Inter</option>
               </select>
            </div>

            <div className="item">
               <h3>Mute Sound/Music:</h3>
               <label className="switch">
                  <input type="checkbox" id="switch"/>
                  <span className="slider round"></span>
               </label>
            </div>
         </div>
      </div>
   )
}

export default SettingsModal;
