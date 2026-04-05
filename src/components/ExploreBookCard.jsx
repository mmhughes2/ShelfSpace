import "./ExploreBookCard.css";

function ExploreBookCard({ book, onSelect }) {
  return (
    <article className="explore-book-card">
      <div className="explore-book-main">
        <img className="explore-book-cover" src={book.image} alt={book.title} />
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

      <button className="add-btn" type="button" onClick={() => onSelect(book.id)}>
        View Details <strong>+</strong>
      </button>
    </article>
  );
}

export default ExploreBookCard;
