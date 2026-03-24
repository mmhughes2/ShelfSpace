import ExploreBookCard from "../components/ExploreBookCard";
import { exploreBooks } from "../data/mockItems";
import "./ExplorePage.css";

function ExplorePage() {
  const popular = exploreBooks.filter((book) => book.section === "popular");
  const chosen = exploreBooks.filter((book) => book.section === "chosen");

  return (
    <div className="explore-page">
      <section className="explore-hero">
        <div className="explore-inner">
          <div className="explore-copy">
            <h1>Explore</h1>
            <p>
              Browse fresh book picks, search by genre, and add your next
              favorite read.
            </p>
          </div>

          <div className="search-shell">
            <label className="search-bar" htmlFor="searchInput">
              <span className="search-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="6.3"></circle>
                  <path d="M16 16l4.5 4.5"></path>
                </svg>
              </span>
              <input
                id="searchInput"
                type="search"
                placeholder="Search by title, author, or genre"
              />
              <button
                className="clear-button"
                type="button"
                aria-label="Clear search"
              >
                x
              </button>
            </label>
            <p className="results-feedback">
              Showing styled reusable cards for the future JSON list.
            </p>
          </div>
        </div>
      </section>

      <main className="explore-content">
        <section className="book-section">
          <div className="section-header">
            <h2>Popular Now</h2>
            <p>
              Trending favorites readers are adding to their shelves right now.
            </p>
          </div>
          <div className="books-list">
            {popular.map((book) => (
              <ExploreBookCard key={book.id} book={book} />
            ))}
          </div>
        </section>

        <section className="book-section">
          <div className="section-header">
            <h2>Chosen For You</h2>
            <p>
              Personalized recommendations built from the same reading vibe as
              your library.
            </p>
          </div>
          <div className="books-list">
            {chosen.map((book) => (
              <ExploreBookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default ExplorePage;
