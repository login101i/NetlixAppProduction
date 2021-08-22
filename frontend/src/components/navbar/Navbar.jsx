import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import "./navbar.scss";
import PersonIcon from "@material-ui/icons/Person";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  console.log(window.pageYOffset);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset > 20 ? true : false);
    return () => (window.onscroll = null);
  };

    const { dispatch } = useContext(AuthContext);

  console.log(isScrolled);
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <Link to="/" className="link">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="" />
          </Link>
          <Link to="/" className="link">
            <span className="navbarmainLinks">Home Page</span>
          </Link>
          <Link to="/series" className="link">
            <span className="navbarmainLinks">Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span className="navbarmainLinks">Movies</span>
          </Link>
          <Link to="/new" className="link">
            <span className="navbarmainLinks">New and Popular</span>
          </Link>

          <Link to="/favourites" className="link">
            <span>My list</span>
          </Link>
        </div>
        <div className="right">
          <PersonIcon className="icon" />
          <SearchIcon className="icon" />
          <NotificationsIcon className="icon" />
          <img src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />
          <div className="profile">
            <ExpandMoreIcon className="icon" />
            <div className="options">
              <div>settings</div>
              <span onClick={() => dispatch(logout())}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
