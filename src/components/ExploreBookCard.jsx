import "./ExploreBookCard.css";

function ExploreBookCard({ book, onSelect, onRemove }) {
  return (
    <article className="explore-book-card">
      <div className="explore-book-main">
        <img
          className="explore-book-cover"
          src={book.image}
          alt={book.title}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = book.fallbackImage;
          }}
        />
        <div className="explore-book-info">
          <div className="explore-book-meta">
            <span className="genre-pill">{book.genre}</span>
            <span className="rating-pill">Rating {book.rating}</span>
          </div>
          <h3>{book.title}</h3>
          <p className="author-line">By {book.author}</p>
          <p className="tagline">{book.tagline}</p>
        </div>
      </div>

      <div className="explore-book-actions">
        <button className="add-btn" type="button" onClick={() => onSelect(book.id)}>
          View Details <strong>+</strong>
        </button>
        <button className="remove-btn" type="button" onClick={() => onRemove(book.id)}>
          Remove
        </button>
      </div>
    </article>
  );
}

export default ExploreBookCard;
