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
        text: "Learn AI fundamentals, ML models, and real-world finance applications"
      },
      {
        img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
        text: "Work on datasets and build predictive financial models"
      }
    ],

    experience: [
      {
        img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
        text: "Use AI tools daily in assignments and projects"
      },
      {
        img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
        text: "Hands-on exposure to real industry AI workflows"
      }
    ]
  };

  const [active, setActive] = useState("build");

  return (
    <section className="ai-section">

      <div className="container">

        {/* Top CTA */}
        <div className="ai-cta">
          <p>
            Download the full curriculum and see exactly what you'll master,
            semester by semester.
          </p>
          <button>Download Detailed Curriculum →</button>
        </div>

        {/* Banner */}
        <div className="ai-banner">
          <div className="ai-banner-text">
            <h2>
              AI @ The <span>Core</span>
            </h2>
            <p>
              Finance is being rewritten by AI. At ISFB, AI is fully integrated
              in what you study, what you build, and even how you learn.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="ai-content">

          {/* Left Filters */}
          <div className="ai-filters">
            <button
              className={active === "build" ? "active" : ""}
              onClick={() => setActive("build")}
            >
              Build with AI
            </button>

            <button
              className={active === "absorb" ? "active" : ""}
              onClick={() => setActive("absorb")}
            >
              Absorb AI as a Discipline
            </button>

            <button
              className={active === "experience" ? "active" : ""}
              onClick={() => setActive("experience")}
            >
              Experience AI every day
            </button>
          </div>

          {/* Right Cards */}
          <div className="ai-cards">
            {data[active].map((item, index) => (
              <div className="ai-card" key={index}>
                <img src={item.img} alt="ai" />
                <p>{item.text}</p>
              </div>
            ))}
          </div>

        </div>

        <p className="ai-bottom-text">
          These aren’t side projects. They’re proof you can work at the cutting edge of finance.
        </p>

      </div>
    </section>
  );
};

export default AICoreSection;