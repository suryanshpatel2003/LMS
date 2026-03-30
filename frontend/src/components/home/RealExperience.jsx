import React, { useState, useEffect, useRef } from 'react';

const RealExperience = () => {
  const [activeLetter, setActiveLetter] = useState('R');
  
  const data = [
    { id: 'R', title: 'Reflections', color: '#c7e36b', type: 'video', img: "https://img.youtube.com/vi/ysz5S6PUM-U/maxresdefault.jpg" },
    { id: 'E', title: 'Experiences', color: '#d4ed7d', type: 'gallery', img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f" },
    { id: 'A', title: 'Applications', color: '#e1f2a3', type: 'simple', img: "https://images.unsplash.com/photo-1509062522246-3755977927d7" },
    { id: 'L', title: 'Leadership', color: '#ebf7c0', type: 'simple', img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d" },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Screen ke beech mein aate hi trigger hoga
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLetter(entry.target.getAttribute('data-id'));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elements = document.querySelectorAll('.stack-card-item');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="real-exp-section">
      <div className="container">
        <div className="row">
          
          {/* LEFT: Sticky Letters with Dynamic Glow */}
          <div className="col-lg-2 d-none d-lg-block">
            <div className="sticky-letters-sidebar">
              {['R', 'E', 'A', 'L'].map((char) => (
                <h1 
                  key={char} 
                  className={`letter-title ${activeLetter === char ? 'active-glow' : ''}`}
                >
                  {char}
                </h1>
              ))}
            </div>
          </div>

          {/* RIGHT: Stacking Cards */}
          <div className="col-lg-10 col-12">
            <div className="cards-stack-container">
              {data.map((card, index) => (
                <div 
                  className="stack-card-item" 
                  key={card.id} 
                  data-id={card.id} // Tracking ke liye ID
                  style={{ 
                    backgroundColor: card.color,
                    top: `${80 + (index * 25)}px`, 
                    zIndex: index + 1 
                  }}
                >
                  <div className="card-content-inner">
                    <div className="card-top-header">
                       <span className="badge-letter">{card.id}</span>
                       <span className="header-text">REAL {card.title.toUpperCase()}</span>
                    </div>
                    
                    <div className="row align-items-center g-4 mt-2">
                      <div className="col-md-7">
                        <h2 className="main-card-title">Real <span>{card.title}</span></h2>
                        <p className="card-description lead">
                          Industry-ready insights from the top 1% practitioners. 
                          Bridging the gap between theory and real-world execution.
                        </p>
                      </div>

                      <div className="col-md-5">
                        <div className="card-media-wrapper">
                          <img src={card.img} alt="content" className="img-fit-card" />
                          {card.type === 'video' && <div className="video-play-btn">▶</div>}
                        </div>
                      </div>
                    </div>
                    
                    <div className="card-footer-action mt-5">
                       <button className="btn-explore-dark">View Details →</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RealExperience;