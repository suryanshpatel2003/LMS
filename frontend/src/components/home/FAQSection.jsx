import React, { useState } from "react";
import "../../styles/global.css";

const FAQSection = () => {
  const faqData = {
    general: [
      {
        q: "What makes ISFB different from a regular BBA or commerce degree?",
        a: "Traditional degrees focus on theory. ISFB is built on REAL pedagogy with industry practitioners, global immersions, case-based learning, and simulations. It prepares you for real-world challenges from day one."
      },
      {
        q: "Does this Programme offer a UGC-certified degree?",
        a: "Yes, the programme aligns with academic standards and offers a recognized degree pathway along with industry certifications."
      },
      {
        q: "What are the core subjects I will study?",
        a: "You will study Financial Accounting, Economics, Data Analytics, Corporate Finance, AI in Finance, and Business Communication."
      },
      {
        q: "Is this course suitable for beginners?",
        a: "Absolutely. The program is designed for students from all backgrounds and starts with strong foundational concepts before moving to advanced topics."
      },
      {
        q: "Will I get industry exposure during the course?",
        a: "Yes, students participate in live projects, internships, hackathons, and industry-led workshops throughout the program."
      }
    ],

    admissions: [
      {
        q: "What is the admission process?",
        a: "The process includes application submission, profile evaluation, and a personal interview to assess your motivation and aptitude."
      },
      {
        q: "Is there an entrance exam?",
        a: "There is no mandatory entrance exam. Selection is based on academic performance and interview."
      },
      {
        q: "What documents are required for admission?",
        a: "You need academic transcripts, ID proof, passport-size photographs, and any additional certificates if applicable."
      },
      {
        q: "When do admissions start?",
        a: "Admissions typically open in multiple rounds throughout the year. Early applications are encouraged."
      },
      {
        q: "Can international students apply?",
        a: "Yes, international students are welcome and supported through the admission process."
      }
    ],

    campus: [
      {
        q: "What is campus life like?",
        a: "Campus life is vibrant with clubs, hackathons, networking events, competitions, and cultural activities."
      },
      {
        q: "Are there student clubs?",
        a: "Yes, there are multiple clubs including Finance Club, Tech Club, Entrepreneurship Cell, and Cultural Clubs."
      },
      {
        q: "Is hostel facility available?",
        a: "Yes, hostel and accommodation support is provided for outstation students."
      },
      {
        q: "Are extracurricular activities encouraged?",
        a: "Definitely. Students actively participate in sports, music, dance, and leadership events."
      },
      {
        q: "Do students get networking opportunities?",
        a: "Yes, students interact with industry leaders, alumni, and recruiters through events and workshops."
      }
    ],

    fees: [
      {
        q: "What is the fee structure?",
        a: "The fee structure varies based on the program and includes tuition, resources, and access to facilities."
      },
      {
        q: "Are scholarships available?",
        a: "Yes, merit-based and need-based scholarships are available for eligible students."
      },
      {
        q: "Is there any installment option for fees?",
        a: "Yes, fees can be paid in multiple installments for student convenience."
      },
      {
        q: "Are there any additional costs?",
        a: "Additional costs may include hostel, travel, or optional certifications."
      },
      {
        q: "Do you provide financial assistance?",
        a: "Yes, financial assistance and loan support options are available through partner institutions."
      }
    ]
  };

  const [activeTab, setActiveTab] = useState("general");
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">FAQ</h2>

        {/* Tabs - Now Responsive */}
        <div className="faq-tabs">
          {[
            { id: "general", label: "General" },
            { id: "admissions", label: "Admissions" },
            { id: "campus", label: "Campus & Life" },
            { id: "fees", label: "Fees & Scholarships" }
          ].map((tab) => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? "active-tab" : ""}
              onClick={() => {
                setActiveTab(tab.id);
                setOpenIndex(0);
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* FAQ LIST */}
        <div className="faq-list">
          {faqData[activeTab].map((item, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? "open" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <span className="q-text">{item.q}</span>
                <span className="q-icon">{openIndex === index ? "−" : "+"}</span>
              </div>

              {openIndex === index && (
                <div className="faq-answer">
                   <p>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;