import React from "react";

const OutcomesSection = () => {
  const logos = [
    { name: "University of Cambridge", img: "https://webcdn.imarticus.org/test/College1.webp" },
    { name: "St John's College", img: "https://webcdn.imarticus.org/test/College2.webp" },
    { name: "MIT", img: "https://webcdn.imarticus.org/test/College3.webp" },
    { name: "Carnegie Mellon", img: "https://webcdn.imarticus.org/ugsof/College4.webp" },
  ];

  return (
    <section className="outcomes-section">
      <div className="container">
        <div className="row align-items-center g-5">
          
          {/* LEFT CONTENT */}
          <div className="col-lg-6 col-md-12 text-content">
            <h4 className="outcome-subtitle">Outcomes</h4>
            <h2 className="outcome-title">
              That Go Beyond The <br /> <span>Degree</span>
            </h2>
            <div className="outcome-description">
              <p>
                At ISFB, your journey doesn't end at graduation; it accelerates.
              </p>
              <p>
                Whether your path leads to top-tier jobs, pursuing a masters at a 
                global university or launching your own venture, we help you get 
                there with structure, intent, and real-world readiness.
              </p>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="col-lg-6 col-md-12">
            <div className="outcome-img-wrapper">
              <img
                src="https://webcdn.imarticus.org/new/OutcomesLaunda.webp"
                alt="ISFB Success Student"
                className="img-fluid outcome-main-img"
              />
            </div>
          </div>
        </div>
      </div>

      {/* LOGO SCROLLER SECTION */}
      <div className="logo-section-wrapper mt-5">
        <div className="logo-container">
          <div className="logo-track">
            {/* Double the logos for seamless infinite scroll */}
            {[...logos, ...logos, ...logos].map((logo, index) => (
              <div className="logo-card-item" key={index}>
                <div className="logo-inner">
                  <img src={logo.img} alt={logo.name} />
                  <span className="logo-name-text">{logo.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutcomesSection;