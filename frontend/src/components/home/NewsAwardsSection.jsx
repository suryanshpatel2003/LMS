import React from "react";
import "../../styles/global.css"; // Make sure your global styles are imported

const NewsAwardsSection = () => {
  // --- NEWS DATA (With Images/Logos) ---
  const newsData = [
    { 
      name: "VCCIRCLE", 
      logoImg: "https://webcdn.imarticus.org/newimageupload-e7388a34eff7ec5844939f4191461380", // Path to VCCircle logo
      text: "Imarticus Learning weighs more M&As To Gear up for IPO" 
    },
    { 
      name: "ENTRACKR", 
      logoImg: "https://logo.clearbit.com/entrackr.com", // Path to Entrackr logo
      text: "ISFB floats Rs 25 Cr venture fund for student founders" 
    },
    { 
      name: "mint", 
      logoImg: "https://webcdn.imarticus.org/newimageupload-c945d1d8541a396f2c29bd9692f99e4c", // Path to Mint logo
      text: "'Prioritize ruthlessly to use time efficiently'" 
    },
    { 
      name: "ET", 
      logoImg: "https://cdn.pegasus.imarticus.org/isfb3/economic.webp", // Path to ET logo
      text: "Imarticus Learning expands CoE programme pan India" 
    },
    { 
      name: "FINANCIAL EXPRESS", 
      logoImg: "https://cdn.pegasus.imarticus.org/isfb3/indian-express.webp", // Path to Financial Express logo
      text: "Imarticus Learning lines up Rs 1,000-crore IPO in FY27" 
    },
  ];

  // --- AWARDS DATA ---
  const awardsData = [
    { img: "https://webcdn.imarticus.org/isfb2/Pride.webp", text: "Gyanodaya Godda initiative bags Silver Award at the National E-governance Awards" },
    { img: "https://webcdn.imarticus.org/isfb2/ET2.webp", text: "Best E-Learning Company Of The Year" },
    { img: "https://webcdn.imarticus.org/isfb2/Knowledge.webp", text: "Best Institute to Study Data Science 2023" },
    { img: "https://webcdn.imarticus.org/isfb2/Success.webp", text: "Outstanding Education Company of the Year" },
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
                {/* Image-based logo */}
                <img 
                  src={item.logoImg} 
                  alt={`${item.name} logo`} 
                  className="news-vendor-logo"
                  style={{ maxHeight: '30px', width: 'auto', marginBottom: '10px' }} // Optional inline style
                />
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
                  <img src={item.img} alt="award logo placeholder" />
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