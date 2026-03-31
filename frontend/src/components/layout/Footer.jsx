import React from "react";
import "../../styles/global.css";
import logo from "../../assets/logo.webp";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row footer-top">
          {/* LEFT - Address & Logo */}
          <div className="col-lg-4 col-md-6 col-sm-12 footer-col">
            <img src={logo} alt="logo" className="footer-logo" />
            <p className="footer-bold-text">
              7th Floor, Hiranandani Knowledge Park, <br />
              Hiranandani Gardens, <br />
              Powai, Mumbai, 400076
            </p>
          </div>

          {/* CENTER - Contact & Social */}
          <div className="col-lg-4 col-md-6 col-sm-12 footer-col">
            <h4 className="footer-heading">Contact Us</h4>
            <div className="contact-details">
              <p className="footer-bold-text">isfb@imarticus.com</p>
              <p className="footer-bold-text">+91-9833982476</p>
            </div>
            <div className="social-icons">
              <span className="icon-box">📷</span>
              <span className="icon-box">▶️</span>
              <span className="icon-box">in</span>
            </div>
          </div>

          {/* RIGHT - Quick Links */}
          <div className="col-lg-4 col-md-12 col-sm-12 footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links-list">
              <li>Home</li>
              <li>UG Program</li>
              <li>PG Program</li>
              <li>Career Outcomes</li>
              <li>Admissions</li>
              <li>Life @ ISFB</li>
              <li>About Us</li>
              <li>Login / Apply</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-line"></div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p>© 2026 Imarticus Learning</p>
          <p className="terms-link">Terms & Conditions</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;