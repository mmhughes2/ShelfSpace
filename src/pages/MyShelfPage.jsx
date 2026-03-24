import BookListItem from "../components/BookListItem";
import { shelfBooks } from "../data/mockItems";
import "./MyShelfPage.css";

function MyShelfPage() {
  return (
    <div className="myshelf-page">
      <section className="myshelf-hero">
        <div className="myshelf-inner">
          <h1>Track your reading your way</h1>
          <p>
            Welcome to your personal corner of the reading world. ShelfSpace
            lets you track your progress while curating a bookshelf that feels
            just as cozy as your favorite reading spot.
          </p>
        </div>

        <div className="dashboard-grid">
          <article className="panel currently-reading">
            <h2>Currently Reading...</h2>
            <div className="reading-layout">
              <img
                src="/assets/myshelf/current-book.jpg"
                alt="The Let Them Theory book cover"
                className="reading-cover"
              />

              <div className="progress-stack">
                <div className="progress-group">
                  <h3>Page 209 of 336</h3>
                  <div className="progress-track">
                    <span style={{ width: "62%" }}></span>
                  </div>
                </div>

                <div className="progress-group">
                  <h3>Chapter 12 of 20</h3>
                  <div className="progress-track">
                    <span style={{ width: "60%" }}></span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article className="panel stats-card">
            <div className="ring-wrap">
              <div className="goal-ring"></div>
              <div className="goal-copy">
                <strong>28 Books</strong>
                <span>70% of Goal</span>
              </div>
            </div>

            <div className="streak-row">
              <span>Reading Streak</span>
              <strong>15 days</strong>
            </div>

            <div className="progress-track compact">
              <span style={{ width: "78%" }}></span>
            </div>

            <button className="accent-button" type="button">
              Edit Goal
            </button>
          </article>
        </div>
      </section>

      <main className="myshelf-main">
        <section className="shelf-section">
          <div className="section-head">
            <h2>My Bookshelf</h2>
            <p>
              Organize what you are currently reading, rate your reads, and add
              new books
            </p>
          </div>

          <div className="shelf-layout">
            <div className="bookshelf-art">
              <img
                src="/assets/myshelf/bookshelf.png"
                alt="Books lined up on a shelf"
              />
            </div>

            <aside className="panel notes-panel">
              <h3>Reading Notes</h3>
              <textarea placeholder="Write notes..."></textarea>
              <button className="save-button" type="button">
                Save Notes
              </button>
            </aside>
          </div>
        </section>

        <section className="panel list-panel">
          <div className="list-controls">
            <label className="search-field">
              <span className="search-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="6.3"></circle>
                  <path d="M16 16l4.5 4.5"></path>
                </svg>
              </span>
              <input type="search" placeholder="Search" />
              <span className="clear-mark" aria-hidden="true">
                x
              </span>
            </label>

            <button className="accent-button" type="button">
              Add Books
            </button>
            <button className="filter-button" type="button">
              Filter <span aria-hidden="true">v</span>
            </button>
          </div>

          <div className="book-list">
            {shelfBooks.map((book) => (
              <BookListItem key={book.title} {...book} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default MyShelfPage;
