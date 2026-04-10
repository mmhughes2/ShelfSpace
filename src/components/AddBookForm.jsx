import { useState } from "react";
import { createBook } from "../services/booksApi";
import "./AddBookForm.css";

const genreOptions = [
  "Contemporary Fiction",
  "Historical Fiction",
  "Literary Fiction",
  "Fantasy",
  "Science Fiction",
  "Thriller",
  "Mystery",
  "Romance",
  "Memoir",
  "Young Adult Fiction",
  "Contemporary Fantasy",
  "Nonfiction",
];

const formatOptions = [
  "Hardcover",
  "Paperback",
  "Audiobook",
  "eBook",
  "Special Edition",
];

const initialValues = {
  title: "",
  author: "",
  genre: "Contemporary Fiction",
  publication_year: "",
  page_count: "",
  rating: "",
  description: "",
  features: "",
  format_type: "Paperback",
  isbn: "",
  price: "",
};

const currentYear = new Date().getFullYear() + 1;

function validatePayload(values) {
  const errors = {};
  const trimmedFeatures = values.features
    .split(",")
    .map((feature) => feature.trim())
    .filter(Boolean);

  if (values.title.trim().length < 2 || values.title.trim().length > 120) {
    errors.title = "Title must be between 2 and 120 characters.";
  }

  if (values.author.trim().length < 2 || values.author.trim().length > 80) {
    errors.author = "Author must be between 2 and 80 characters.";
  }

  if (values.genre.trim().length < 2 || values.genre.trim().length > 60) {
    errors.genre = "Genre must be between 2 and 60 characters.";
  }

  const publicationYear = Number(values.publication_year);
  if (!Number.isInteger(publicationYear) || publicationYear < 1000 || publicationYear > currentYear) {
    errors.publication_year = `Publication year must be between 1000 and ${currentYear}.`;
  }

  const pageCount = Number(values.page_count);
  if (!Number.isInteger(pageCount) || pageCount < 1 || pageCount > 5000) {
    errors.page_count = "Page count must be a whole number between 1 and 5000.";
  }

  const rating = Number(values.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    errors.rating = "Choose a star rating from 1 to 5.";
  }

  if (values.description.trim().length < 10 || values.description.trim().length > 600) {
    errors.description = "Description must be between 10 and 600 characters.";
  }

  if (!trimmedFeatures.length) {
    errors.features = "Add at least one feature separated by commas.";
  } else if (trimmedFeatures.some((feature) => feature.length < 2 || feature.length > 80)) {
    errors.features = "Each feature must be between 2 and 80 characters.";
  }

  if (values.format_type.trim().length < 2 || values.format_type.trim().length > 40) {
    errors.format_type = "Format type must be between 2 and 40 characters.";
  }

  if (values.isbn.trim().length < 10 || values.isbn.trim().length > 20) {
    errors.isbn = "ISBN must be between 10 and 20 characters.";
  }

  if (values.price.trim().length < 2 || values.price.trim().length > 20) {
    errors.price = "Price must be between 2 and 20 characters.";
  }

  return {
    errors,
    payload: {
      title: values.title.trim(),
      author: values.author.trim(),
      genre: values.genre.trim(),
      publication_year: publicationYear,
      page_count: pageCount,
      rating,
      main_image: "/images/books.png",
      description: values.description.trim(),
      features: trimmedFeatures,
      formats: [
        {
          type: values.format_type.trim(),
          isbn: values.isbn.trim(),
          price: values.price.trim(),
        },
      ],
    },
  };
}

function AddBookForm({ onBookAdded }) {
  const [values, setValues] = useState(initialValues);
  const [selectedCover, setSelectedCover] = useState(null);
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function handleCoverChange(event) {
    setSelectedCover(event.target.files?.[0] || null);
  }

  function handleRatingSelect(starValue) {
    setValues((current) => ({ ...current, rating: String(starValue) }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const { errors: validationErrors, payload } = validatePayload(values);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      setIsSuccess(false);
      setStatusMessage("Please fix the highlighted fields before submitting.");
      return;
    }

    try {
      setErrors({});
      setIsSubmitting(true);
      const result = await createBook(payload);
      const previewUrl = selectedCover ? URL.createObjectURL(selectedCover) : null;

      onBookAdded(
        previewUrl
          ? {
              ...result.book,
              image: previewUrl,
              fallbackImage: previewUrl,
            }
          : result.book
      );
      setValues(initialValues);
      setSelectedCover(null);
      setIsSuccess(true);
      setStatusMessage("Book added successfully and the collection has been updated.");
    } catch (error) {
      setIsSuccess(false);
      setStatusMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="add-book-panel">
      <div className="add-book-copy">
        <h2>Add a new title to ShelfSpace</h2>
      </div>

      <form className="add-book-form" onSubmit={handleSubmit} noValidate>
        <label>
          <span>Title</span>
          <input name="title" value={values.title} onChange={handleChange} />
          {errors.title ? <small>{errors.title}</small> : null}
        </label>

        <label>
          <span>Author</span>
          <input name="author" value={values.author} onChange={handleChange} />
          {errors.author ? <small>{errors.author}</small> : null}
        </label>

        <label>
          <span>Genre</span>
          <select name="genre" value={values.genre} onChange={handleChange}>
            {genreOptions.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          {errors.genre ? <small>{errors.genre}</small> : null}
        </label>

        <label>
          <span>Publication Year</span>
          <input
            name="publication_year"
            value={values.publication_year}
            onChange={handleChange}
          />
          {errors.publication_year ? <small>{errors.publication_year}</small> : null}
        </label>

        <label>
          <span>Page Count</span>
          <input name="page_count" value={values.page_count} onChange={handleChange} />
          {errors.page_count ? <small>{errors.page_count}</small> : null}
        </label>

        <label>
          <span>Rating</span>
          <div className="star-rating" role="radiogroup" aria-label="Book rating">
            {[1, 2, 3, 4, 5].map((starValue) => (
              <button
                key={starValue}
                type="button"
                className={
                  Number(values.rating) >= starValue
                    ? "star-button star-button-active"
                    : "star-button"
                }
                onClick={() => handleRatingSelect(starValue)}
                aria-label={`Set rating to ${starValue} star${starValue > 1 ? "s" : ""}`}
              >
                ★
              </button>
            ))}
          </div>
          {errors.rating ? <small>{errors.rating}</small> : null}
        </label>

        <label className="full-width">
          <span>Add Cover</span>
          <input type="file" accept="image/*" onChange={handleCoverChange} />
        </label>

        <label className="full-width">
          <span>Description</span>
          <textarea
            name="description"
            rows="5"
            value={values.description}
            onChange={handleChange}
          ></textarea>
          {errors.description ? <small>{errors.description}</small> : null}
        </label>

        <label className="full-width">
          <span>Features</span>
          <input
            name="features"
            value={values.features}
            onChange={handleChange}
            placeholder="Book club favorite, Reflective, Fast-paced"
          />
          {errors.features ? <small>{errors.features}</small> : null}
        </label>

        <label>
          <span>Format Type</span>
          <select name="format_type" value={values.format_type} onChange={handleChange}>
            {formatOptions.map((format) => (
              <option key={format} value={format}>
                {format}
              </option>
            ))}
          </select>
          {errors.format_type ? <small>{errors.format_type}</small> : null}
        </label>

        <label>
          <span>ISBN</span>
          <input name="isbn" value={values.isbn} onChange={handleChange} />
          {errors.isbn ? <small>{errors.isbn}</small> : null}
        </label>

        <label>
          <span>Price</span>
          <input name="price" value={values.price} onChange={handleChange} />
          {errors.price ? <small>{errors.price}</small> : null}
        </label>

        <div className="full-width form-footer">
          <button className="add-book-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Book"}
          </button>
          {statusMessage ? (
            <p className={isSuccess ? "form-message success" : "form-message error"}>
              {statusMessage}
            </p>
          ) : null}
        </div>
      </form>
    </section>
  );
}

export default AddBookForm;
