import { useState } from "react";

const Leaders = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    "Domain Visionaries In Finance, Investment & Capital Markets",
    "Academic Leaders, Policy Experts & Ecosystem Builders",
    "AI, Fintech, Data Science & New-Age Finance"
  ];

  // Teeno tabs ke liye alag-alag data array
  const data = [
    // TAB 0: Domain Visionaries
    [
      { name: "Ajay Rajan", role: "Country Head, Transaction Banking", company: "YES BANK", img: "https://webcdn.imarticus.org/SOF/PhilipF.webp" },
      { name: "Rajat Mathur", role: "Senior Advisor & Ex MD", company: "Morgan Stanley", img: "https://webcdn.imarticus.org/SOF/AjayR.webp" },
      { name: "Akhil Chaturvedi", role: "Chief Business Officer", company: "Motilal Oswal", img: "https://webcdn.imarticus.org/SOF/RajatM.webp" },
      { name: "Ravindra Pandey", role: "Dy Managing Director, COO", company: "SBI", img: "https://webcdn.imarticus.org/SOF/AkhilC.webp" },
      { name: "Saurabh Jain", role: "Vice President", company: "Paytm", img: "https://webcdn.imarticus.org/SOF/RavindraP.webp" },
      { name: "Ankit Sharma", role: "VP Finance", company: "Barclays", img: "https://webcdn.imarticus.org/SOF/AmitR.webp" },
      { name: "Vikram Sethi", role: "Director", company: "Deutsche Bank", img: "https://webcdn.imarticus.org/SOF/VikasK.webp" },
      { name: "Priya Nair", role: "Head of Finance", company: "HDFC", img: "https://webcdn.imarticus.org/SOF/AvantikaT.webp" }
    ],
    // TAB 1: Academic Leaders
    [
      { name: "Dr. Arvind Sahay", role: "Professor of Marketing", company: "IIM Ahmedabad", img: "https://webcdn.imarticus.org/SOF/GarimaB.webp" },
      { name: "Prof. Rajesh Iyer", role: "Head of Education", company: "ISB Hyderabad", img: "https://webcdn.imarticus.org/isfb/SandipGNew.webp" },
      { name: "Dr. Meera Shankar", role: "Policy Advisor", company: "NITI Aayog", img: "https://webcdn.imarticus.org/SOF/VijayaM.webp" },
      { name: "Prof. V. Ramgopal", role: "Director", company: "IIT Delhi", img: "https://webcdn.imarticus.org/isfb/PrathamMNew.webp" },
      { name: "Dr. S. K. Gupta", role: "Dean", company: "SRM University", img: "https://webcdn.imarticus.org/SOF/ApoorvaJ.webp" },
      { name: "Prof. Anupam Basu", role: "Director", company: "NIT Durgapur", img: "https://webcdn.imarticus.org/SOF/GarimaB.webp" }
    ],
    // TAB 2: AI & Fintech
    [
      { name: "Nitin Kamath", role: "Founder & CEO", company: "Zerodha", img: "https://webcdn.imarticus.org/SOF/RKRangan.webp" },
      { name: "Prukalpa Sankar", role: "Co-Founder", company: "Atlan", img: "https://webcdn.imarticus.org/SOF/RaghvendraS.webp" },
      { name: "Abhinav Kumar", role: "Head of AI Research", company: "TCS", img: "https://webcdn.imarticus.org/SOF/AbhishantP.webp" },
      { name: "Sandeep Nailwal", role: "Co-Founder", company: "Polygon", img: "https://webcdn.imarticus.org/SOF/PrasannaL.webp" },
      { name: "Harshil Mathur", role: "CEO & Co-Founder", company: "Razorpay", img: "https://webcdn.imarticus.org/SOF/PrasarS.webp" },
      { name: "Neha Narkhede", role: "Co-Founder", company: "Confluent", img: "https://webcdn.imarticus.org/SOF/LeonDS.webp" }
    ]
  ];

  return (
    <section className="leaders-section">
      <div className="container">
        <h2 className="leaders-title">
          Backed by Leaders that Move <span>Real-Markets</span>
        </h2>

        <div className="leaders-tabs">
          {tabs.map((tab, i) => (
            <button
              key={i}
              className={activeTab === i ? "active" : ""}
              onClick={() => setActiveTab(i)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="leaders-content-box">
          <div className="leaders-scroll-container">
            {/* 👈 FIXED: Mapping based on activeTab data */}
            {data[activeTab].map((item, index) => (
              <div className="leader-card" key={index}>
                <img src={item.img} alt={item.name} />
                <div className="leader-overlay">
                  <div className="leader-info">
                    <h5 className="leader-name">{item.name}</h5>
                    <p className="leader-role">{item.role}</p>
                    <div className="leader-company-tag">
                      <span>{item.company}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leaders;