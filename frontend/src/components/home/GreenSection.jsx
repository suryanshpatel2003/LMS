const GreenSection = () => {
  return (
    <section className="green-section">
      <div className="container">
        <div className="row">
          {/* LEFT TEXT */}
          <div className="col-lg-5">
            <div className="sticky-text">
              <h2>
                You Graduate with the <br />
                ISFB <span>Edge</span>
              </h2>
              <p>
                We’ve built your learning journey keeping the best possible tenets in mind
              </p>
            </div>
          </div>

          {/* RIGHT SIDE (CARDS STACK) */}
          <div className="col-lg-7">
            <div className="cards-stack-container">
              
              {/* CARD 1 */}
              <div className="scroll-card light" style={{ top: "100px" }}>
                <div className="card-inner">
                  <img src="https://images.unsplash.com/photo-1552664730-d307ca884978" alt="Expertise" />
                  <div className="card-content">
                    <h5>Razorsharp & deep Finance Expertise</h5>
                    <p>A 3-year journey with deep specialisations in Fintech, Financial Analysis, and Global Accounting.</p>
                  </div>
                </div>
              </div>

              {/* CARD 2 */}
              <div className="scroll-card dark" style={{ top: "120px" }}>
                <div className="card-inner">
                  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" alt="Learning" />
                  <div className="card-content">
                    <h5>Global & Grounded Learning</h5>
                    <p>Exposure from global financial hubs like Singapore to real-world Indian markets.</p>
                  </div>
                </div>
              </div>

              {/* CARD 3 */}
              <div className="scroll-card light" style={{ top: "140px" }}>
                <div className="card-inner">
                  <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d" alt="Curriculum" />
                  <div className="card-content">
                    <h5>Industry Ready Curriculum</h5>
                    <p>Hands-on real world projects including ACCA and CFA integrated tracks.</p>
                  </div>
                </div>
              </div>

              {/* CARD 4 (LAST CARD) */}
              <div className="scroll-card dark" style={{ top: "160px" }}>
                <div className="card-inner">
                  <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" alt="Placement" />
                  <div className="card-content">
                    <h5>Placement Support</h5>
                    <p>Strong hiring network and dedicated career support to make you career-ready.</p>
                  </div>
                </div>
              </div>

              {/* CENTERED BUTTON RIGHT AFTER CARDS */}
              <div className="final-btn-container">
                <button className="start-journey-btn">
                  Start Your Journey <span className="arrow">→</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GreenSection;