import React, { useState } from "react";

const LifeSection = () => {
  const data = {
    flagship: {
      list: [
        {
          title: "TEDxISFB",
          img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
          desc: "Students & Speakers share powerful ideas at the intersection of finance, culture, technology, and philosophy."
        },
        {
          title: "MUN @ ISFB",
          img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
          desc: "Debate global issues and enhance diplomacy & leadership skills in our model united nations."
        },
        {
          title: "ISFB Demo Day",
          img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80",
          desc: "Pitch your startup ideas to investors and industry experts in a high-stakes environment."
        },
        {
          title: "ISFB Showcase",
          img: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
          desc: "Showcase your innovation, projects, and business thinking to the academic community."
        }
      ]
    },
    clubs: {
      list: [
        {
          title: "Fintech Club",
          img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
          desc: "Lead innovations in financial technology and stay ahead of digital banking trends."
        },
        {
          title: "Entrepreneurship Cell",
          img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
          desc: "Nurturing the next generation of founders with mentorship and resources."
        }
      ]
    },
    // Baaki data categories bhi same structure mein rahengi...
  };

  const [activeTab, setActiveTab] = useState("flagship");
  const [activeItem, setActiveItem] = useState(0);

  const categories = [
    { id: "flagship", label: "Flagship Events", icon: "🚩" },
    { id: "clubs", label: "Student-Led Clubs", icon: "🏫" },
    { id: "cocurricular", label: "Co-Curriculars", icon: "🎨" },
    { id: "everyday", label: "Everyday Life", icon: "🛡️" }
  ];

  const currentList = data[activeTab]?.list || data["flagship"].list;
  const currentItem = currentList[activeItem] || currentList[0];

  return (
    <section className="life-at-isfb">
      <div className="container">
        
        {/* Header Text */}
        <div className="section-header">
          <h2 className="display-5 fw-bold"><i>Life @</i> ISFB</h2>
          <p className="lead-text">
            Whether you're leading a fintech club, pitching ideas at a hackathon, or jamming with the dance crew on weekends, every moment here is designed to sharpen your edge and shape the professional you're becoming.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="custom-tab-nav">
          {categories.map((cat) => (
            <div 
              key={cat.id}
              className={`nav-item-wrapper ${activeTab === cat.id ? "active" : ""}`}
              onClick={() => { setActiveTab(cat.id); setActiveItem(0); }}
            >
              <div className="nav-pill">
                <span className="icon">{cat.icon}</span>
                <span className="label">{cat.label}</span>
              </div>
              <div className="bottom-line"></div>
            </div>
          ))}
        </div>

        {/* Dynamic Content Area */}
        <div className="row mt-5 g-4 align-items-stretch">
          
          {/* Left Navigation List */}
          <div className="col-lg-4 col-md-5">
            <div className="item-selector-list">
              {currentList.map((item, index) => (
                <div
                  key={index}
                  className={`selector-item ${activeItem === index ? "selected" : ""}`}
                  onClick={() => setActiveItem(index)}
                >
                  {item.title}
                </div>
              ))}
            </div>
          </div>

          {/* Right Detail Card */}
          <div className="col-lg-8 col-md-7">
            <div className="detail-display-card">
               <div className="row g-0 h-100 align-items-center">
                  <div className="col-lg-6 p-3">
                    <div className="img-container">
                      <img src={currentItem.img} alt={currentItem.title} />
                    </div>
                  </div>
                  <div className="col-lg-6 p-4">
                    <p className="detail-desc">{currentItem.desc}</p>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LifeSection;