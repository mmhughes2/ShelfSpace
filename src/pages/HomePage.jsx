import ProjectLinks from "../components/ProjectLinks";
import TestimonialCard from "../components/TestimonialCard";
import { homeTestimonials } from "../data/mockItems";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-container">
          <div className="hero-copy">
            <h1>Welcome to ShelfSpace</h1>
            <p>Track your pages, discover new stories, and read together.</p>

            <div className="hero-actions">
              <a className="button button-primary" href="#/myshelf">
                Begin Tracking
              </a>
              <a className="button button-secondary" href="#/profile">
                Join a Book Club
              </a>
            </div>
          </div>

          <div className="hero-image-card">
            <img
              src="/assets/homepage/books.png"
              alt="A row of books on a colorful background"
            />
          </div>
        </div>
      </section>

      <main className="home-main">
        <section className="feature feature-split">
          <div className="feature-copy">
            <h2>Track your reading, your way</h2>
            <p>
              ShelfSpace helps you organize your books, track what you&apos;ve
              read, and discover what to read next all in one beautiful digital
              bookshelf.
            </p>
            <a className="button button-primary" href="#/myshelf">
              Build your Shelf
            </a>
          </div>

          <div className="feature-visual">
            <img
              src="/assets/homepage/app-preview1.png"
              alt="ShelfSpace dashboard preview"
            />
          </div>
        </section>

        <section className="feature feature-split reverse">
          <div className="feature-visual">
            <img
              src="/assets/homepage/app-preview2.png"
              alt="ShelfSpace community preview"
            />
          </div>

          <div className="feature-copy">
            <h2>Read together, anywhere</h2>
            <p>
              Join vibrant virtual book clubs, meet fellow readers, and take
              part in live discussions, shared reading schedules, and community
              events.
            </p>
            <a className="button button-primary" href="#/explore">
              Explore the Community
            </a>
          </div>
        </section>

        <section className="media-section">
          <div className="media-copy">
            <p className="eyebrow">ShelfSpace Spotlight</p>
            <h2>Plan your next bookstore day</h2>
            <p>
              The original project used an interactive map here. For Part 8,
              this React version keeps the same section design while avoiding
              the iframe requirement for now.
            </p>
            <a className="button button-secondary" href="#/explore">
              Browse More Picks
            </a>
          </div>

          <div className="iframe-card static-card">
            <img
              src="/assets/homepage/books.png"
              alt="ShelfSpace featured reading view"
            />
          </div>
        </section>

        <section className="testimonials" aria-label="Testimonials">
          {homeTestimonials.map((item) => (
            <TestimonialCard key={item.author} {...item} />
          ))}
        </section>

        <ProjectLinks />
      </main>
    </div>
  );
}

export default HomePage;
