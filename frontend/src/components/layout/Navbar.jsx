import { useState } from "react";
import { Link } from "react-router-dom"; // Imported for routing
import logo from "../../assets/logo.webp"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container">
        
        {/* LOGO */}
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Imarticus Logo" className="logo-img" />
        </Link>

        {/* MOBILE TOGGLE (Custom Hamburger) */}
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
        </button>

        {/* MENU */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link dropdown-toggle-custom" to="#">
                UG Program <span className="arrow-down">▾</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">PG Program</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">Life @ ISFB</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">About Us</Link>
            </li>
            
            {/* LOGIN / APPLY BUTTON */}
            <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
              <Link to="/login">
                <button className="apply-btn">
                  Login / Apply
                </button>
              </Link>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;