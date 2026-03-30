const Hero = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center">
          {/* LEFT CONTENT */}
          <div className="col-lg-7 text-white">
            <h2 className="small-text">India’s Only</h2>
            <h1 className="hero-title">
              UG Program in Finance and <br /> Business that gets you{" "}
              <span className="highlight">Real-World Ready</span>
            </h1>

            <button className="brochure-btn">
              Download Brochure <span className="arrow-icon">↗</span>
            </button>

            <div className="deadline-wrapper">
              <div className="deadline-label">Round 3 Application Deadline</div>
              <div className="deadline-date">30th April 2026</div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="col-lg-5">
            <div className="form-card">
              <h4 className="form-heading">Start Your Journey in</h4>
              <h3 className="highlight-text">Finance & Business</h3>
              <p className="form-sub">Fill in your details below and our admissions team will guide you through the next steps.</p>
              
              <p className="login-link">Already Registered? <a href="#">Login here</a></p>

              <div className="row gx-2">
                <div className="col-6">
                  <input type="text" placeholder="Enter First Name *" />
                </div>
                <div className="col-6">
                  <input type="text" placeholder="Enter Last Name *" />
                </div>
              </div>
              
              <input type="email" placeholder="Enter Email Address *" />
              
              <div className="phone-input-group">
                <span className="country-code">+91</span>
                <input type="text" placeholder="Enter Mobile Number *" />
              </div>

              <input type="text" placeholder="Enter OTP" />

              <div className="row gx-2">
                <div className="col-6">
                  <select><option>Select State</option></select>
                </div>
                <div className="col-6">
                  <select><option>Select City</option></select>
                </div>
              </div>

              <select>
                <option>Select Academic Status *</option>
              </select>

              <button className="submit-btn">SUBMIT</button>
              
              <p className="terms-text">By submitting the form I have read and agree to the <a href="#">Terms</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;