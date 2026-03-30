import React, { useEffect, useState } from "react";


const CareerJourneySection = () => {
  const [activeTab, setActiveTab] = useState("Placements");

  const menuItems = [
    { id: "Placements", label: "Placements" },
    { id: "Entrepreneurship", label: "Entrepreneurship" },
    { id: "Masters", label: "Masters" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".journey-card-wrapper");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        // Intersection logic: Center of screen check
        if (rect.top <= 350 && rect.bottom >= 350) {
          setActiveTab(section.getAttribute("data-category"));
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="career-journey-root">
      <div className="container-fluid px-md-5">
        <div className="row g-5">
          
          {/* LEFT SIDEBAR - Sticky */}
          <div className="col-lg-3 d-none d-lg-block">
            <div className="sidebar-sticky-nav">
              {menuItems.map((item) => (
                <div 
                  key={item.id} 
                  className={`nav-btn ${activeTab === item.id ? "nav-btn-active" : ""}`}
                >
                  {item.label}
                </div>
              ))}
              <div className="mt-4 px-2">
                 <button className="btn-start-global w-100">Start Your Journey →</button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Scrolling Cards */}
          <div className="col-lg-9 col-12">
            
            {/* --- 1. PLACEMENTS --- */}
            <div className="journey-card-wrapper" data-category="Placements">
              <div className="main-content-card">
                <h2 className="title-text">India’s Strongest <span>Career Launchpad</span></h2>
                <p className="subtitle-text lead">Backed by a decade of legacy and experience we've built India's most powerful Career services Engine.</p>
                
                <div className="row g-4 mt-4">
                  <div className="col-md-4">
                    <div className="stat-box-white">
                      <h1 className="stat-number">50,000+</h1>
                      <p className="stat-desc">Alumni hired by Fortune 500 companies</p>
                      <div className="stat-tag">📈 4000+ hired by Big 4s</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="stat-box-white">
                      <h1 className="stat-number">1000+</h1>
                      <p className="stat-desc">Companies hire from us every year</p>
                      <div className="stat-tag">📈 70% hire at least one student</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="stat-box-white">
                      <h1 className="stat-number">1 in 5</h1>
                      <p className="stat-desc">IB professionals is an Imarticus Alumnus</p>
                      <div className="stat-tag">📈 Listed as Requirement</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Roles Sub-Card */}
              <div className="main-content-card mt-5">
                 <h2 className="title-text"><i>Roles</i> Our Alumni Own Today</h2>
                 <div className="row g-4 mt-3">
                    <div className="col-md-6">
                      <div className="inner-role-card">
                        <h5 className="fw-bold">Management Consulting</h5>
                        <div className="salary-grid">
                           <div className="salary-item"><strong>₹12.5 LPA</strong><br/><small>CTC</small></div>
                           <div className="salary-item"><strong>3,800+</strong><br/><small>Postings</small></div>
                        </div>
                        <div className="brand-logos">
                           <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/McKinsey_%26_Company_logo.svg" alt="logo" />
                           <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Boston_Consulting_Group_logo.svg" alt="logo" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="inner-role-card">
                        <h5 className="fw-bold">Financial Strategy</h5>
                        <div className="salary-grid">
                           <div className="salary-item"><strong>₹10 LPA</strong><br/><small>CTC</small></div>
                           <div className="salary-item"><strong>2,600+</strong><br/><small>Postings</small></div>
                        </div>
                        <div className="brand-logos">
                           <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/PricewaterhouseCoopers_Logo.svg" alt="logo" />
                           <img src="https://upload.wikimedia.org/wikipedia/commons/3/34/EY_logo_2019.svg" alt="logo" />
                        </div>
                      </div>
                    </div>
                 </div>
              </div>
            </div>

            {/* --- 2. ENTREPRENEURSHIP --- */}
            <div className="journey-card-wrapper" data-category="Entrepreneurship">
              <div className="main-content-card">
                <div className="fund-highlight-banner mb-4">
                   <h3>Powered By BLInC Invest's <span>25Cr Finance Venture Fund</span></h3>
                   <p className="mb-0 mt-2 small opacity-75">We don't just talk about entrepreneurship. We invest in it.</p>
                </div>
                <div className="row g-4">
                   {[
                     {t: "Venture Fund", d: "Largest Fund built within a UG program for students.", icon: "💰"},
                     {t: "Startup Studio", d: "A year-round lab where students ideate and build.", icon: "💡"},
                     {t: "Curriculum", d: "Built on Financial First Principles like CAC and Cap Tables.", icon: "📋"},
                     {t: "Co-Founders", d: "Discover co-founders organically across our diverse cohort.", icon: "🤝"}
                   ].map((item, i) => (
                     <div className="col-md-6" key={i}>
                        <div className="feature-card-white h-100">
                           <span className="fs-3">{item.icon}</span>
                           <h6 className="fw-bold mt-2">{item.t}</h6>
                           <p className="small mb-0 text-muted">{item.d}</p>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            </div>

            {/* --- 3. MASTERS (Added More Content for Scroll Room) --- */}
            <div className="journey-card-wrapper" data-category="Masters">
              <div className="main-content-card">
                <h2 className="title-text">Take The Leap To <span>Global B-Schools</span></h2>
                <p className="subtitle-text">Get access to the full-stack platform trusted by thousands of top admits.</p>
                
                <div className="masters-logo-bg mt-4">
                   <p className="fw-bold small text-center mb-4">Where Ambito Has Helped Students Land For Masters:</p>
                   <div className="d-flex justify-content-around align-items-center flex-wrap gap-4">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg" alt="mit" className="m-logo" />
                      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/b/bb/Carnegie_Mellon_University_seal.svg/1200px-Carnegie_Mellon_University_seal.svg.png" alt="cmu" className="m-logo" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Stanford_University_logo.svg" alt="stanford" className="m-logo" />
                      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Harvard_shield_wreath.svg/1200px-Harvard_shield_wreath.svg.png" alt="harvard" className="m-logo" />
                   </div>
                </div>

                <div className="row g-4 mt-5">
                   {[
                     {t: "Elite Admissions Tools", d: "AI-powered SOP builders, resume optimizers, and profile insights."},
                     {t: "Test Prep, Amplified", d: "GMAT, GRE, and IELTS prep stack with adaptive learning paths."},
                     {t: "Worldview That Stands Out", d: "Immersions at Singapore and IIM Visakhapatnam for global application."},
                     {t: "Proof of Work", d: "KPMG-powered projects to back your ambitions with real assets."}
                   ].map((tool, i) => (
                     <div className="col-md-6" key={i}>
                        <div className="inner-role-card shadow-none border">
                           <h6 className="fw-bold">{tool.t}</h6>
                           <p className="small text-muted mb-0">{tool.d}</p>
                        </div>
                     </div>
                   ))}
                </div>
              </div>

              {/* Extra Card for Scroll Padding */}
              <div className="main-content-card mt-5 mb-5">
                 <h2 className="title-text">How This <span>Partnership</span> Takes You Places</h2>
                 <div className="row g-4 mt-3">
                    <div className="col-md-12">
                       <div className="stat-box-white d-flex align-items-center gap-4">
                          <div className="display-4 text-success fw-bold">15+</div>
                          <div>
                             <h6 className="fw-bold mb-1">Personal Mentors</h6>
                             <p className="small mb-0">Exclusive access to industry mentors from Investment Bankers to Fintech Experts.</p>
                          </div>
                       </div>
                    </div>
                    <div className="col-md-12">
                       <div className="stat-box-white d-flex align-items-center gap-4">
                          <div className="display-4 text-success fw-bold">75k+</div>
                          <div>
                             <h6 className="fw-bold mb-1">Alumni Strength</h6>
                             <p className="small mb-0">Our alumni lead teams at Goldman Sachs, PwC, KPMG, and BlackRock.</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerJourneySection;