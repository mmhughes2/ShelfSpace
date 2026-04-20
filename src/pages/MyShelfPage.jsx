import { useEffect, useMemo, useState } from "react";
import AddBookForm from "../components/AddBookForm";
import BookListItem from "../components/BookListItem";
import { deleteBook, fetchBooks } from "../services/booksApi";
import "./MyShelfPage.css";

function MyShelfPage() {
  const base = import.meta.env.BASE_URL;
  const [books, setBooks] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeletingId, setIsDeletingId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [deleteStatus, setDeleteStatus] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadBooks() {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const data = await fetchBooks();

        if (!ignore) {
          setBooks(data);
          setSelectedBook(data[0] ?? null);
        }
      } catch (error) {
        if (!ignore) {
          setErrorMessage("Your ShelfSpace list could not be loaded right now.");
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

  function handleEditSelect(book) {
    setSelectedBook(book);
    setEditStatus("");
  }

  async function handleDelete(book) {
    const confirmed = window.confirm(`Delete "${book.title}" from your shelf?`);

    if (!confirmed) {
      return;
    }

    try {
      setIsDeletingId(book.id);
      await deleteBook(book.id);
      const remainingBooks = books.filter((item) => item.id !== book.id);
      setBooks(remainingBooks);
      setSelectedBook((current) =>
        current?.id === book.id ? remainingBooks[0] ?? null : current
      );
      setDeleteStatus(`"${book.title}" was deleted successfully.`);
      setEditStatus("");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message || "The selected book could not be deleted.");
    } finally {
      setIsDeletingId("");
    }
  }

  function handleBookUpdated(updatedBook) {
    setBooks((current) =>
      current.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
    setSelectedBook(updatedBook);
    setEditStatus(`"${updatedBook.title}" was updated successfully.`);
    setDeleteStatus("");
    setErrorMessage("");
  }

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
                src={`${base}assets/myshelf/current-book.jpg`}
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
                src={`${base}assets/myshelf/bookshelf.png`}
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

        <section className="shelf-section shelf-editor-section">
          {errorMessage ? <p className="shelf-feedback error">{errorMessage}</p> : null}
          {editStatus ? <p className="shelf-feedback success">{editStatus}</p> : null}
          {deleteStatus ? <p className="shelf-feedback success">{deleteStatus}</p> : null}

          {selectedBook ? (
            <AddBookForm
              mode="edit"
              book={selectedBook}
              heading={`Edit "${selectedBook.title}"`}
              submitLabel="Save Book"
              onBookUpdated={handleBookUpdated}
              onCancel={() => {
                setSelectedBook(null);
                setEditStatus("");
              }}
            />
          ) : (
            <div className="empty-editor panel">
              <h3>Select a book to edit</h3>
              <p>
                Choose any title from your list below to update it without refreshing
                the page.
              </p>
            </div>
          )}
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
              <input
                type="search"
                placeholder="Search your shelf"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />
              <button
                className="clear-list-search"
                type="button"
                aria-label="Clear shelf search"
                onClick={() => setSearchValue("")}
              >
                x
              </button>
            </label>

            <button
              className="accent-button"
              type="button"
              onClick={() => {
                setSelectedBook(null);
                setEditStatus("");
              }}
            >
              Reset Editor
            </button>
            <button className="filter-button" type="button">
              {books.length} Books
            </button>
          </div>

          <div className="book-list">
            {isLoading ? (
              <div className="list-empty-state">Loading your shelf...</div>
            ) : filteredBooks.length === 0 ? (
              <div className="list-empty-state">
                No books matched that search on your shelf.
              </div>
            ) : (
              filteredBooks.map((book) => (
                <BookListItem
                  key={book.id}
                  book={book}
                  onEdit={handleEditSelect}
                  onDelete={handleDelete}
                  isDeleting={isDeletingId === book.id}
                />
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default MyShelfPage;
