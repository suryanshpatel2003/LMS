const Placements = () => {
  const companies = [
    { name: "EY", count: "5000+" },
    { name: "JP Morgan", count: "1500+" },
    { name: "Citi", count: "1500+" },
    { name: "Morgan Stanley", count: "1200+" },
    { name: "KPMG", count: "900+" },
    { name: "Deloitte", count: "2000+" },
  ];

  return (
    <section className="placements-section">

      <div className="container">
        <h2 className="placements-title">
          <span>50,000+</span> Placements in <span>Fortune 500</span> Companies
        </h2>
      </div>

      {/* AUTO SCROLL WRAPPER */}
      <div className="slider">

        <div className="slide-track">

          {/* DOUBLE DATA FOR INFINITE LOOP */}
          {[...companies, ...companies].map((item, index) => (
            <div className="placement-card" key={index}>
              <div className="logo-box">
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