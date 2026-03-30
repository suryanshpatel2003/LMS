import React from "react";
import "../../styles/global.css";

const FinanceCouncil = () => {
  return (
    <section className="finance-section">
      <div className="container">

        {/* Heading */}
        <h2 className="finance-title">
          The Finance Skill <span>Council</span>
        </h2>

        <p className="finance-subtext">
          At ISFB, every student’s learning journey is benchmarked not just by
          professors or practitioners - but by institutions that shape the
          finance industry today.
        </p>

        {/* Top Cards */}
        <div className="row finance-cards">

          <div className="col-md-4">
            <div className="finance-card">
              <h5>Investment Banking</h5>
              <img src="https://via.placeholder.com/120x40" alt="Ambit" />
            </div>
          </div>

          <div className="col-md-4">
            <div className="finance-card">
              <h5>Asset & Wealth Management</h5>
              <img src="https://via.placeholder.com/120x40" alt="Motilal" />
            </div>
          </div>

          <div className="col-md-4">
            <div className="finance-card">
              <h5>Digital Finance & AI</h5>
              <img src="https://via.placeholder.com/120x40" alt="Cognizant" />
            </div>
          </div>

        </div>

        {/* Description */}
        <p className="finance-desc">
          Each institution occupies a metaphorical seat to define & direct
          learning for a specific domain of finance - Retail Banking,
          Investment Banking, Asset & Wealth Management, and Digital Finance &
          AI, setting the gold standard for what you learn and how you apply it
          in real-world.
        </p>

        {/* Bottom Features */}
        <div className="row finance-features">

          <div className="col-md-3">
            <div className="feature-box">
              <div className="icon">📊</div>
              <h6>Real-time Financial Labs</h6>
              <p>
                Solve live market challenges through industry-simulated
                scenarios.
              </p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="feature-box">
              <div className="icon">📈</div>
              <h6>Immersive Masterclasses</h6>
              <p>
                Gain strategic insights beyond textbooks, driven by current
                industry trends.
              </p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="feature-box">
              <div className="icon">📁</div>
              <h6>Interactive Case Studies</h6>
              <p>
                Engage deeply with real-world financial scenarios guided by
                industry veterans.
              </p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="feature-box">
              <div className="icon">📦</div>
              <h6>Collaborative Deal Studios</h6>
              <p>
                Co-create financial strategies and participate in investment
                decision-making simulations.
              </p>
            </div>
          </div>

        </div>

        {/* Button */}
        <div className="text-center mt-5">
          <button className="finance-btn">
            Start Your Journey →
          </button>
        </div>

      </div>
    </section>
  );
};

export default FinanceCouncil;