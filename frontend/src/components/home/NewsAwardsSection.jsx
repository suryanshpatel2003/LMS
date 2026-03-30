import React from "react";
import "../../styles/global.css"; // Make sure your global styles are imported

const NewsAwardsSection = () => {
  const newsData = [
    { logo: "VCCIRCLE", text: "Imarticus Learning weighs more M&As To Gear up for IPO" },
    { logo: "ENTRACKR", text: "ISFB floats Rs 25 Cr venture fund for student founders" },
    { logo: "mint", text: "'Prioritize ruthlessly to use time efficiently'" },
    { logo: "ET The Economic Times", text: "Imarticus Learning expands CoE programme pan India" },
    { logo: "FINANCIAL EXPRESS", text: "Imarticus Learning lines up Rs 1,000-crore IPO in FY27" },
  ];

  const awardsData = [
    { img: "eg-logo.png", text: "Gyanodaya Godda initiative bags Silver Award at the National E-governance Awards" },
    { img: "entrepreneur-logo.png", text: "Best E-Learning Company Of The Year" },
    { img: "certificate.png", text: "Best Institute to Study Data Science 2023" },
    { img: "et-business-logo.png", text: "Outstanding Education Company of the Year" },
  ];

  // Helper to render laurel graphic
  const LaurelWreath = () => (
    <div className="laurel-wreath">
      <div className="leaf-left"></div>
      <div className="leaf-right"></div>
    </div>
  );

  return (
    <section className="news-awards-section">
      <div className="container">
        {/* --- NEWS SECTION --- */}
        <div className="section-header">
          <h2 className="main-title">In the <span>News</span></h2>
          <p className="sub-title">Stay updated with our latest milestones, media features, and industry accolades.</p>
        </div>
      </div>

      <div className="news-slider-container">
        <div className="slider-track news-track-animation">
          {/* Double data for seamless infinite loop */}
          {[...newsData, ...newsData].map((item, index) => (
            <div className="news-card-item" key={index}>
              <div className="card-logo-area">
                <span className={`logo-text-icon ${item.logo.toLowerCase().includes('mint') ? 'mint-logo' : ''}`}>
                  {item.logo}
                </span>
              </div>
              <p className="card-news-text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container mt-5 pt-4">
        {/* --- AWARDS SECTION --- */}
        <div className="section-header">
          <h2 className="main-title"><span>Awards</span> we Won</h2>
          <p className="sub-title">Discover the recognitions that highlight our commitment to innovation, quality, and industry impact.</p>
        </div>
      </div>

      <div className="awards-slider-container">
        <div className="slider-track awards-track-animation">
          {[...awardsData, ...awardsData, ...awardsData].map((item, index) => (
            <div className="award-card-item" key={index}>
              <div className="laurel-wrapper">
                <LaurelWreath />
                <div className="award-logo-box">
                  <img src={item.img} alt="award logo placeholder" /> {/* Replace with actual transparent logos */}
                </div>
                <LaurelWreath />
              </div>
              <p className="award-text-para">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsAwardsSection;