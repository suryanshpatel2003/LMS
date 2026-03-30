import React, { useEffect, useRef } from "react";

const ExperienceSection = () => {
  const stickyContainerRef = useRef(null);
  const horizontalScrollRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!stickyContainerRef.current || !horizontalScrollRef.current) return;

      const container = stickyContainerRef.current;
      const scrollTarget = horizontalScrollRef.current;

      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // Jab section view mein aaye tabhi scroll calculate karo
      if (scrollY >= containerTop && scrollY <= containerTop + containerHeight - windowHeight) {
        const scrolledContentWidth = scrollTarget.scrollWidth - window.innerWidth;
        const maxScrollableHeight = containerHeight - windowHeight;
        
        // Percentage nikal lo kitna scroll hua hai
        const progress = (scrollY - containerTop) / maxScrollableHeight;
        const translateX = progress * scrolledContentWidth;

        scrollTarget.style.transform = `translateX(-${translateX}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const yearsData = [1, 2, 3, 4, 5]; // 5 Dummy cards

  return (
    <section className="experience-wrapper" ref={stickyContainerRef}>
      <div className="sticky-content">
        
        {/* Header Content - Jo scroll ke saath upar fixed rahega */}
        <div className="header-container container">
           <h2 className="main-title">Your 3-Year <span>Experiential Journey</span> At ISFB</h2>
           <p className="sub-title">Learning at the ISFB Campus, Mumbai</p>
           <p className="desc-text">Every experience here is designed to make you REAL-World Ready.</p>
        </div>

        {/* Horizontal Card Section */}
        <div className="horizontal-scroll-container" ref={horizontalScrollRef}>
          {yearsData.map((year) => (
            <div className="journey-card" key={year}>
              <div className="card-left">
                <span className="year-badge">Year {year}</span>
                <h3 className="immersion-title">Foundation & First Immersion</h3>
                
                <div className="skills-list">
                  <p className="skill-label">Skills You'll Master:</p>
                  <ul>
                    <li>✔ Financial Accounting</li>
                    <li>✔ Economic Decision-Making</li>
                    <li>✔ Quantitative Analysis</li>
                    <li>✔ AI & Technology</li>
                  </ul>
                </div>
              </div>

              <div className="card-right-green">
                <div className="green-inner">
                  <div className="top-banner">
                    <img src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&w=400&q=80" alt="campus" />
                    <div className="overlay-txt">Live and Learn at <span>IIM Visakhapatnam</span></div>
                  </div>
                  <div className="bottom-grid">
                    <div className="grid-item">
                      <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=200&q=80" alt="hackathon" />
                      <p>FinAce Hackathon</p>
                    </div>
                    <div className="grid-item">
                      <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=200&q=80" alt="council" />
                      <p>Finance Skill Council</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExperienceSection;