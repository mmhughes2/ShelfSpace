import "./BookDetailModal.css";

function BookDetailModal({ book, onClose }) {
  if (!book) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="book-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          type="button"
          aria-label="Close book details"
          onClick={onClose}
        >
          x
        </button>

        <div className="book-modal-top">
          <img
            src={book.image}
            alt={`${book.title} cover`}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = book.fallbackImage;
            }}
          />

          <div className="book-modal-copy">
            <p className="section-label">Book Details</p>
            <h2 id="book-modal-title">{book.title}</h2>
            <p className="modal-author">By {book.author}</p>
            <div className="modal-pills">
              <span>{book.genre}</span>
              <span>Rating {book.rating}</span>
              <span>{book.pageCount} pages</span>
              <span>{book.publicationYear}</span>
            </div>
            <p className="modal-description">{book.description}</p>
          </div>
        </div>

        <div className="modal-grid">
          <article className="modal-panel">
            <h3>Why readers pick it</h3>
            <ul className="modal-list">
              {book.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>

          <article className="modal-panel">
            <h3>Available formats</h3>
            <div className="format-list">
              {book.formats.map((format) => (
                <div key={`${format.type}-${format.isbn}`} className="format-card">
                  <strong>{format.type}</strong>
                  <span>{format.isbn}</span>
                  <span>{format.price}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

export default BookDetailModal;
