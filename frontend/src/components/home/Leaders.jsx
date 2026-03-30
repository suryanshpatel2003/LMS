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
      { name: "Ajay Rajan", role: "Country Head, Transaction Banking", company: "YES BANK", img: "https://randomuser.me/api/portraits/men/11.jpg" },
      { name: "Rajat Mathur", role: "Senior Advisor & Ex MD", company: "Morgan Stanley", img: "https://randomuser.me/api/portraits/men/12.jpg" },
      { name: "Akhil Chaturvedi", role: "Chief Business Officer", company: "Motilal Oswal", img: "https://randomuser.me/api/portraits/men/13.jpg" },
      { name: "Ravindra Pandey", role: "Dy Managing Director, COO", company: "SBI", img: "https://randomuser.me/api/portraits/men/14.jpg" },
      { name: "Saurabh Jain", role: "Vice President", company: "Paytm", img: "https://randomuser.me/api/portraits/men/32.jpg" },
      { name: "Ankit Sharma", role: "VP Finance", company: "Barclays", img: "https://randomuser.me/api/portraits/men/33.jpg" },
      { name: "Vikram Sethi", role: "Director", company: "Deutsche Bank", img: "https://randomuser.me/api/portraits/men/34.jpg" },
      { name: "Priya Nair", role: "Head of Finance", company: "HDFC", img: "https://randomuser.me/api/portraits/women/35.jpg" }
    ],
    // TAB 1: Academic Leaders
    [
      { name: "Dr. Arvind Sahay", role: "Professor of Marketing", company: "IIM Ahmedabad", img: "https://randomuser.me/api/portraits/men/22.jpg" },
      { name: "Prof. Rajesh Iyer", role: "Head of Education", company: "ISB Hyderabad", img: "https://randomuser.me/api/portraits/men/25.jpg" },
      { name: "Dr. Meera Shankar", role: "Policy Advisor", company: "NITI Aayog", img: "https://randomuser.me/api/portraits/women/26.jpg" },
      { name: "Prof. V. Ramgopal", role: "Director", company: "IIT Delhi", img: "https://randomuser.me/api/portraits/men/28.jpg" },
      { name: "Dr. S. K. Gupta", role: "Dean", company: "SRM University", img: "https://randomuser.me/api/portraits/men/50.jpg" },
      { name: "Prof. Anupam Basu", role: "Director", company: "NIT Durgapur", img: "https://randomuser.me/api/portraits/men/51.jpg" }
    ],
    // TAB 2: AI & Fintech
    [
      { name: "Nitin Kamath", role: "Founder & CEO", company: "Zerodha", img: "https://randomuser.me/api/portraits/men/44.jpg" },
      { name: "Prukalpa Sankar", role: "Co-Founder", company: "Atlan", img: "https://randomuser.me/api/portraits/women/45.jpg" },
      { name: "Abhinav Kumar", role: "Head of AI Research", company: "TCS", img: "https://randomuser.me/api/portraits/men/46.jpg" },
      { name: "Sandeep Nailwal", role: "Co-Founder", company: "Polygon", img: "https://randomuser.me/api/portraits/men/47.jpg" },
      { name: "Harshil Mathur", role: "CEO & Co-Founder", company: "Razorpay", img: "https://randomuser.me/api/portraits/men/60.jpg" },
      { name: "Neha Narkhede", role: "Co-Founder", company: "Confluent", img: "https://randomuser.me/api/portraits/women/61.jpg" }
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