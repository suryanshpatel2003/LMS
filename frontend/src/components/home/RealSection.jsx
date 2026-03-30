import { useState } from "react";

const RealSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="real-section">

      <div className="container">
        <div className="row align-items-center">

          {/* LEFT TEXT */}
          <div className="col-lg-6">
            <h2 className="real-title">
              At ISFB, <span>Finance Education</span> gets <br />
              <span className="italic">R-E-A-L.</span>
            </h2>

            <p>
              Our R.E.A.L. pedagogy is built to collapse the distance between classroom concepts and boardroom decisions.
            </p>

            <p>
              It begins with a strong academic foundation, refined through real-world simulations and industry feedback.
            </p>

            <p>
              This isn't theory. This is finance as it’s lived, led, and leveraged.
            </p>
          </div>

          {/* RIGHT VIDEO */}
          <div className="col-lg-6">
            <div className="video-box" onClick={() => setOpen(true)}>
              <img
                src="https://img.youtube.com/vi/ysz5S6PUM-U/maxresdefault.jpg"
                alt="thumbnail"
              />

              <div className="play-btn">▶</div>
            </div>
          </div>

        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="video-modal" onClick={() => setOpen(false)}>
          <div className="video-container" onClick={(e) => e.stopPropagation()}>
            <iframe
              src="https://www.youtube.com/embed/ysz5S6PUM-U?autoplay=1"
              title="video"
              allow="autoplay"
            ></iframe>
          </div>
        </div>
      )}

    </section>
  );
};

export default RealSection;