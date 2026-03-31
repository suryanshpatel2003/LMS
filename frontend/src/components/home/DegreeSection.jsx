const DegreeSection = () => {
  return (
    <section className="degree-section">
      <div className="container">

        {/* TITLE */}
        <h2 className="degree-title">
          Graduate with a <span>BBA Degree</span> and a{" "}
          <span>Global Finance Specialisation</span>
        </h2>

        {/* DESCRIPTION */}
        <p className="degree-desc">
          The Undergraduate in Finance and Business is a full time, on campus
          program built for flexibility and focus. Students are recommended to
          pursue a Bachelor of Business Administration (BBA) from NMIMS Centre
          for Distance and Online Education (CDOE) alongside their ISFB program.
        </p>

        <div className="row align-items-center mt-4">

          {/* LEFT TEXT */}
          <div className="col-lg-5">
            <p className="degree-left">
              Students go on to specialise early through ACCA or CFA aligned
              pathways, building targeted expertise in investment banking,
              capital markets, global accounting, and asset management.
              This integrated approach delivers deep finance skills, real
              industry exposure, and a recognised BBA degree, with a global
              to grassroots experience.
            </p>
          </div>

          {/* RIGHT CERTIFICATES */}
          <div className="col-lg-7">
            <div className="certificates">

              <div className="cert-card">
                <img src="https://webcdn.imarticus.org/new/ACCA.webp" alt="certificate" />
              </div>

              <div className="cert-card">
                <img src="https://webcdn.imarticus.org/new/CFA.webp" alt="certificate" />
              </div>

            </div>
          </div>

        </div>

        {/* BUTTON */}
        <div className="text-center mt-5">
          <button className="degree-btn">
            Know more about BBA Degree →
          </button>

          <p className="note">
            *ISFB neither issues these degrees nor is a partner to any university that issues them.
          </p>
        </div>

      </div>
    </section>
  );
};

export default DegreeSection;