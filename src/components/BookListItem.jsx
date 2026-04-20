import "./BookListItem.css";

function BookListItem({ book, onEdit, onDelete, isDeleting }) {
  return (
    <article className="shelf-book-row">
      <img
        src={book.image}
        alt={`${book.title} book cover`}
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = book.fallbackImage;
        }}
      />
      <div className="shelf-book-copy">
        <h3>{book.title}</h3>
        <p>By {book.author}</p>
        <span>
          {book.genre} · {book.pageCount} pages · Rating {book.rating}
        </span>
      </div>
      <div className="shelf-book-actions">
        <button type="button" onClick={() => onEdit(book)}>
          Edit
        </button>
        <button
          type="button"
          className="danger-action"
          onClick={() => onDelete(book)}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </article>
  );
}

export default BookListItem;
