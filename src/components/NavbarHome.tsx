import { Link } from "react-router-dom";

const NavbarHome = () => {
   return (
      <nav>
         <ul>
            <li><Link to="/tracker">tracker</Link></li>
            <li><Link to="/tools">tools</Link></li>
            <li><Link to="/schedule">schedule</Link></li>
            <li><Link to="/profile">profile</Link></li>
         </ul>
      </nav>
   );
};

export default NavbarHome;
