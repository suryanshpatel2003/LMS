import React from "react";
import "../../styles/global.css";
import logo from "../../assets/logo.webp";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="container">

        <div className="row footer-top">

          {/* LEFT */}
          <div className="col-md-4 footer-col">
            <img src={logo} alt="logo" className="footer-logo" />

            <p>
              7th Floor, Hiranandani Knowledge Park, <br />
              Hiranandani Gardens, <br />
              Powai, Mumbai, 400076
            </p>
          </div>

          {/* CENTER */}
          <div className="col-md-4 footer-col">
            <h4>Contact Us</h4>

            <p>isfb@imarticus.com</p>
            <p>+91-9833982476</p>

            <div className="social-icons">
              <span>📷</span>
              <span>▶️</span>
              <span>in</span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-md-4 footer-col">
            <h4>Quick Links</h4>

            <ul>
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
          <p>© 2025 Imarticus Learning</p>
          <p>Terms & Conditions</p>
        </div>

      </div>

    </footer>
  );
};

export default Footer;