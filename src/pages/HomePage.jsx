import { Link } from "react-router-dom";
import ReadingMapEmbed from "../components/ReadingMapEmbed";
import Slideshow from "../components/Slideshow";
import TestimonialCard from "../components/TestimonialCard";
import { homeTestimonials } from "../data/mockItems";
import "./HomePage.css";

function HomePage() {
  const base = import.meta.env.BASE_URL;
  const slides = [
    {
      title: "Track your reads",
      description:
        "A focused bookshelf view that keeps progress, goals, and favorites in one place.",
      image: `${base}assets/homepage/books.png`,
      alt: "ShelfSpace home book graphic",
    },
    {
      title: "Build your shelf",
      description:
        "Preview the reading dashboard and the cozy visual style carried over from the original project.",
      image: `${base}assets/homepage/app-preview1.png`,
      alt: "ShelfSpace dashboard preview",
    },
    {
      title: "Read with others",
      description:
        "Move from solo reading into community events, clubs, and shared recommendations.",
      image: `${base}assets/homepage/app-preview2.png`,
      alt: "ShelfSpace community preview",
    },
  ];

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-container">
          <div className="hero-copy">
            <h1>Welcome to ShelfSpace</h1>
            <p>Track your pages, discover new stories, and read together.</p>

            <div className="hero-actions">
              <Link className="button button-primary" to="/myshelf">
                Begin Tracking
              </Link>
              <Link className="button button-secondary" to="/profile">
                Join a Book Club
              </Link>
            </div>
          </div>

          <div className="hero-image-card">
            <img
              src={`${base}assets/homepage/books.png`}
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
            <Link className="button button-primary" to="/myshelf">
              Build your Shelf
            </Link>
          </div>

          <div className="feature-visual">
            <img
              src={`${base}assets/homepage/app-preview1.png`}
              alt="ShelfSpace dashboard preview"
            />
          </div>
        </section>

        <section className="feature feature-split reverse">
          <div className="feature-visual">
            <img
              src={`${base}assets/homepage/app-preview2.png`}
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
            <Link className="button button-primary" to="/explore">
              Explore the Community
            </Link>
          </div>
        </section>

        <Slideshow slides={slides} />

        <section className="media-section">
          <div className="media-copy">
            <p className="eyebrow">ShelfSpace Spotlight</p>
            <h2>Plan your next bookstore day</h2>
            <p>
              The interactive map is back in the React build, so the page keeps
              the original ShelfSpace idea while meeting the Part 9 iframe
              requirement.
            </p>
            <Link className="button button-secondary" to="/explore">
              Browse More Picks
            </Link>
          </div>

          <ReadingMapEmbed />
        </section>

        <section className="testimonials" aria-label="Testimonials">
          {homeTestimonials.map((item) => (
            <TestimonialCard key={item.author} {...item} />
          ))}
        </section>
      </main>
    </div>
  );
}

export default HomePage;
