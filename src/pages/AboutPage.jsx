import "./AboutPage.css";

function AboutPage() {
  const base = import.meta.env.BASE_URL;

  return (
    <div className="about-page">
      <section className="about-hero-section">
        <div className="about-hero-container">
          <h1>Our Story</h1>

          <div className="story-grid">
            <div className="story-image-wrap">
              <img
                src={`${base}assets/about/ourstory.png`}
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
                src={`${base}assets/about/friendly-book-discussion-cafe.png`}
                alt="Friends having a book discussion at a cafe"
              />
            </figure>
            <figure className="gallery-card">
              <img
                src={`${base}assets/about/reading-cozy-library.png`}
                alt="Reader enjoying a quiet moment in a cozy library"
              />
            </figure>
            <figure className="gallery-card">
              <img
                src={`${base}assets/about/reading-smiles-cafe.png`}
                alt="Readers smiling together at a cafe table"
              />
            </figure>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
