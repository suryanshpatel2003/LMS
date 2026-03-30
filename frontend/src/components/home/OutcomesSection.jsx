import React from "react";

const OutcomesSection = () => {
  const logos = [
    { name: "University of Cambridge", img: "https://upload.wikimedia.org/wikipedia/en/thumb/1/11/University_of_Cambridge_coat_of_arms.svg/1200px-University_of_Cambridge_coat_of_arms.svg.png" },
    { name: "St John's College", img: "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/St_John%27s_College_Cambridge_Shield.svg/1200px-St_John%27s_College_Cambridge_Shield.svg.png" },
    { name: "MIT", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/1280px-MIT_logo.svg.png" },
    { name: "Carnegie Mellon", img: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bb/Carnegie_Mellon_University_seal.svg/1200px-Carnegie_Mellon_University_seal.svg.png" },
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
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
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