import { useEffect, useMemo, useState } from "react";
import BookDetailModal from "../components/BookDetailModal";
import ExploreBookCard from "../components/ExploreBookCard";
import { fetchBookById, fetchBooks } from "../services/booksApi";
import "./ExplorePage.css";

function ExplorePage() {
  const [books, setBooks] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalLoading, setIsModalLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadBooks() {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const data = await fetchBooks();

        if (!ignore) {
          setBooks(data);
        }
      } catch (error) {
        if (!ignore) {
          setErrorMessage(
            "The live ShelfSpace collection could not be loaded right now."
          );
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadBooks();

    return () => {
      ignore = true;
    };
  }, []);

  const filteredBooks = useMemo(() => {
    const search = searchValue.trim().toLowerCase();

    if (!search) {
      return books;
    }

    return books.filter((book) =>
      [book.title, book.author, book.genre, book.description]
        .join(" ")
        .toLowerCase()
        .includes(search)
    );
  }, [books, searchValue]);

  const spotlightBooks = filteredBooks.filter((book) => book.rating >= 4.5);

  async function handleSelectBook(id) {
    try {
      setIsModalLoading(true);
      const book = await fetchBookById(id);
      setSelectedBook(book);
    } catch (error) {
      setErrorMessage("The selected book details could not be loaded.");
    } finally {
      setIsModalLoading(false);
    }
  }

  return (
    <div className="explore-page">
      <section className="explore-hero">
        <div className="explore-inner">
          <div className="explore-copy">
            <h1>Explore</h1>
            <p>
              Browse fresh book picks from the live ShelfSpace server, search by
              title or genre, and open each book for a full detail view.
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
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />
              <button
                className="clear-button"
                type="button"
                aria-label="Clear search"
                onClick={() => setSearchValue("")}
              >
                x
              </button>
            </label>
            {isLoading ? (
              <p className="results-feedback">
                Loading the live ShelfSpace collection...
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <main className="explore-content">
        {errorMessage ? <p className="error-banner">{errorMessage}</p> : null}

        <section className="book-section">
          <div className="section-header">
            <h2>Library Collection</h2>
          </div>

          {isLoading ? (
            <div className="books-grid loading-grid">
              <article className="skeleton-card"></article>
              <article className="skeleton-card"></article>
              <article className="skeleton-card"></article>
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="empty-state">
              No books matched that search. Try a different title, author, or
              genre.
            </div>
          ) : (
            <div className="books-grid">
              {filteredBooks.map((book) => (
                <ExploreBookCard key={book.id} book={book} onSelect={handleSelectBook} />
              ))}
            </div>
          )}
        </section>

        <section className="book-section">
          <div className="section-header">
            <h2>Spotlight Picks</h2>
            <p>
              Top-rated titles from the same backend collection, presented as a
              second styled shelf for visual variety.
            </p>
          </div>

          {spotlightBooks.length === 0 ? (
            <div className="empty-state">
              Spotlight picks will appear here when matching high-rated books are
              available.
            </div>
          ) : (
            <div className="books-grid">
              {spotlightBooks.map((book) => (
                <ExploreBookCard
                  key={`spotlight-${book.id}`}
                  book={book}
                  onSelect={handleSelectBook}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {isModalLoading ? (
        <div className="modal-loader">Loading book details...</div>
      ) : null}

      <BookDetailModal book={selectedBook} onClose={() => setSelectedBook(null)} />
    </div>
  );
}

export default ExplorePage;
