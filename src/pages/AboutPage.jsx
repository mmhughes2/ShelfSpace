import "./AboutPage.css";

function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-hero-section">
        <div className="about-hero-container">
          <h1>Our Story</h1>

          <div className="story-grid">
            <div className="story-image-wrap">
              <img
                src="/assets/profile/profile.png"
                alt="Founder portrait"
                className="story-image"
              />
            </div>

            <div className="story-copy">
              <h2>Where it began</h2>
              <p>
                ShelfSpace began in late nights between classes, when I stacked
                dog-eared paperbacks beside glowing screens at the University of
                South Carolina. I wanted one warm digital home to track stories,
                share joy, and connect readers across campuses, couches, and
                countries together.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="interests-section">
        <div className="interests-container">
          <h2>Interests and hobbies</h2>

          <p className="interests-copy">
            ShelfSpace Book Clubs bring readers together beyond the pages.
            Whether meeting at a cozy cafe or connecting online, members share
            ideas, swap recommendations, and experience stories as a community.
          </p>

          <div className="gallery-grid">
            <figure className="gallery-card">
              <img
                src="/assets/profile/friend1.png"
                alt="ShelfSpace member smiling with a book"
              />
            </figure>
            <figure className="gallery-card">
              <img
                src="/assets/profile/friend2.png"
                alt="ShelfSpace member browsing on a device"
              />
            </figure>
            <figure className="gallery-card">
              <img
                src="/assets/profile/friend3.png"
                alt="ShelfSpace community member portrait"
              />
            </figure>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
