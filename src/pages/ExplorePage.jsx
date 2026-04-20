import { useEffect, useMemo, useState } from "react";
import AddBookForm from "../components/AddBookForm";
import BookDetailModal from "../components/BookDetailModal";
import ExploreBookCard from "../components/ExploreBookCard";
import { deleteBook, fetchBookById, fetchBooks } from "../services/booksApi";
import "./ExplorePage.css";

function ExplorePage() {
  const [books, setBooks] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

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

  async function handleRemoveBook(id) {
    const confirmed = window.confirm("Remove this book from ShelfSpace?");

    if (!confirmed) {
      return;
    }

    try {
      await deleteBook(id);
      setBooks((current) => current.filter((book) => book.id !== id));
      setSelectedBook((current) => (current?.id === id ? null : current));
      setEditingBook((current) => (current?.id === id ? null : current));
      setErrorMessage("");
      setSuccessMessage("Book removed successfully.");
    } catch (error) {
      setErrorMessage("The selected book could not be removed.");
      setSuccessMessage("");
    }
  }

  function handleBookAdded(book) {
    setBooks((current) => [book, ...current]);
    setSearchValue("");
    setEditingBook(null);
    setErrorMessage("");
    setSuccessMessage("Book added successfully.");
  }

  function handleStartEdit(book) {
    setEditingBook(book);
    setErrorMessage("");
    setSuccessMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBookUpdated(updatedBook) {
    setBooks((current) =>
      current.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
    setSelectedBook((current) => (current?.id === updatedBook.id ? updatedBook : current));
    setEditingBook(updatedBook);
    setErrorMessage("");
    setSuccessMessage("Book updated successfully.");
  }

  return (
    <div className="explore-page">
      <section className="explore-hero">
        <div className="explore-inner">
          <div className="explore-copy">
            <h1>Explore</h1>
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
        {successMessage ? <p className="success-banner">{successMessage}</p> : null}

        <AddBookForm
          mode={editingBook ? "edit" : "create"}
          book={editingBook}
          heading={
            editingBook
              ? `Edit "${editingBook.title}"`
              : "Add a new title to ShelfSpace"
          }
          submitLabel={editingBook ? "Save Changes" : "Add Book"}
          successMessage={
            editingBook
              ? "Book updated successfully and the collection has been refreshed."
              : "Book added successfully and the collection has been updated."
          }
          onBookAdded={handleBookAdded}
          onBookUpdated={handleBookUpdated}
          onCancel={() => {
            setEditingBook(null);
            setSuccessMessage("");
          }}
        />

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
                <ExploreBookCard
                  key={book.id}
                  book={book}
                  onSelect={handleSelectBook}
                  onEdit={handleStartEdit}
                  onRemove={handleRemoveBook}
                />
              ))}
            </div>
          )}
        </section>

        <section className="book-section">
          <div className="section-header">
            <h2>Spotlight Picks</h2>
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
                  onEdit={handleStartEdit}
                  onRemove={handleRemoveBook}
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
