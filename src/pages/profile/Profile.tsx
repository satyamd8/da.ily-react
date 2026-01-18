import Navbar from "../../components/Navbar";
import "./profile.css";

const Profile = () => {
   return (
      <div className="profile-page">
         <header>
            <h3>da.ily</h3>
            <Navbar />
         </header>
         <div className="wip">
            <h1>Work In Progress</h1>
            <br></br>
            <h2>Check Back Later!</h2>
         </div>
      </div>
   );
};

export default Profile;
