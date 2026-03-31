import React, { useState } from "react";
import "../../styles/global.css";

const AICoreSection = () => {
  const data = {
    build: [
      {
        img: "https://webcdn.imarticus.org/test/Card11.webp",
        text: "Harsh built an AI-powered stock trading bot that analyses real-time markets"
      },
      {
        img: "https://webcdn.imarticus.org/test/Card21.webp",
        text: "Rashmi’s innovative fraud detection and risk prediction model using AI"
      },
      {
        img: "https://webcdn.imarticus.org/test/Card31.webp",
        text: "Harun’s AI-optimised portfolios and forecasting engine"
      }
    ],
    absorb: [
      {
        img: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        text: "Learn AI fundamentals, ML models, and real-world finance applications from the ground up."
      },
      {
        img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
        text: "Work on massive datasets and build predictive financial models that matter."
      }
    ],
    experience: [
      {
        img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
        text: "Use AI tools daily in assignments, projects, and classroom simulations."
      },
      {
        img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
        text: "Hands-on exposure to real industry AI workflows and automation tools."
      }
    ]
  };

  const [active, setActive] = useState("build");

  return (
    <section className="ai-section">
      <div className="container">
        
        {/* Top CTA */}
        <div className="ai-cta">
          <p className="cta-text">
            Download the full curriculum and see exactly what you'll master,
            semester by semester.
          </p>
          <button className="cta-btn">Download Detailed Curriculum →</button>
        </div>

        {/* Banner Box */}
        <div className="ai-banner">
          <div className="ai-banner-content">
            <h2>
              AI @ The <span>Core</span>
            </h2>
            <p>
              Finance is being rewritten by AI. At ISFB, AI is fully integrated
              in what you study, what you build, and even how you learn.
            </p>
          </div>
        </div>

        {/* Green Content Box */}
        <div className="ai-content-box">
          <div className="ai-layout">
            
            {/* Sidebar Filters */}
            <div className="ai-sidebar">
              {Object.keys(data).map((key) => (
                <button
                  key={key}
                  className={active === key ? "active" : ""}
                  onClick={() => setActive(key)}
                >
                  {key === "build" && "Build with AI"}
                  {key === "absorb" && "Absorb AI"}
                  {key === "experience" && "Experience AI"}
                </button>
              ))}
            </div>

            {/* Scrollable Cards Area */}
            <div className="ai-cards-wrapper">
              <div className="ai-cards-grid">
                {data[active].map((item, index) => (
                  <div className="ai-card" key={index}>
                    <div className="ai-card-img">
                      <img src={item.img} alt="ai-work" />
                    </div>
                    <div className="ai-card-info">
                      <p>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        <p className="ai-footer-note">
          These aren’t side projects. They’re proof you can work at the cutting edge of finance.
        </p>

      </div>
    </section>
  );
};

export default AICoreSection;