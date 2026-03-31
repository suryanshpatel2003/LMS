import React from 'react';
 // Apni CSS file import karein

const Placements = () => {
  const companies = [
    { name: "EY", count: "5000+", logo: "https://webcdn.imarticus.org/ugsof/CompanyLogos1.webp" },
    { name: "JP Morgan", count: "1500+", logo: "https://webcdn.imarticus.org/ugsof/CompanyLogos3.webp" },
    { name: "Citi", count: "1500+", logo: "https://webcdn.imarticus.org/ugsof/CompanyLogos2.webp" },
    { name: "Morgan Stanley", count: "1200+", logo: "https://webcdn.imarticus.org/ux_rewamp/MorganStanleyNew.webp" },
    { name: "KPMG", count: "900+", logo: "https://webcdn.imarticus.org/ugsof/CompanyLogos5.webp" },
  ];

  return (
    <section className="placements-section">
      <div className="container">
        <h2 className="placements-title">
          <span>50,000+</span> Placements in <span>Fortune 500</span> Companies
        </h2>
      </div>

      <div className="slider">
        <div className="slide-track">
          {[...companies, ...companies].map((item, index) => (
            <div className="placement-card" key={index}>
              <div className="logo-box">
                <img src={item.logo} alt={item.name} className="company-logo" />
                <h4>{item.name}</h4>
              </div>
              <h2>{item.count}</h2>
              <p>Placements</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Placements;