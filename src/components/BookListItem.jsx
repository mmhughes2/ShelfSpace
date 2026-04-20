import "./BookListItem.css";

function BookListItem({ image, title, author }) {
  return (
    <article className="shelf-book-row">
      <img src={image} alt={`${title} book cover`} />
      <div>
        <h3>{title}</h3>
        <p>By {author}</p>
      </div>
    </article>
  );
}

export default BookListItem;
