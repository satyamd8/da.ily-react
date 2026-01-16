import { Link } from "react-router-dom";

const Navbar = () => {
   return (
      <nav>
         <ul>
            <li><Link to="/">home</Link></li>
            <li><Link to="/tracker" className="active">tracker</Link></li>
            <li><Link to="/tools">tools</Link></li>
            <li><Link to="/schedule">schedule</Link></li>
            <li><Link to="/profile">profile</Link></li>
         </ul>
      </nav>
   );
};

export default Navbar;
