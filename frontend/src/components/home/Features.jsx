const Features = () => {
  return (
    <section className="features-section">
      <div className="container">
        <div className="features-container">
          {[
            { icon: "📅", title: "3 Year Full Time", desc: "UG Program With Opt-In Residence" },
            { icon: "📖", title: "BBA Degree", desc: "Pursued Independently In Parallel" },
            { icon: "👍", title: "ACCA & CFA", desc: "Integrated Curriculum" },
            { icon: "🏛️", title: "Immersions", desc: "IIM Visakhapatnam, Singapore & Explore India Mission" },
            { icon: "✔️", title: "Located In", desc: "Powai, Mumbai, India's Financial Hub" }
          ].map((item, index) => (
            <div className="feature-item" key={index}>
              <div className="feature-icon">{item.icon}</div>
              <h6>{item.title}</h6>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;