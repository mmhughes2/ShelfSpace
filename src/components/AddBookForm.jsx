import { useEffect, useState } from "react";
import { createBook, updateBook } from "../services/booksApi";
import {
  formatOptions,
  genreOptions,
  initialBookFormValues,
  mapBookToFormValues,
  validateBookPayload,
} from "../utils/bookForm";
import "./AddBookForm.css";

function AddBookForm({
  mode = "create",
  book = null,
  heading = "Add a new title to ShelfSpace",
  submitLabel,
  successMessage,
  onBookAdded,
  onBookUpdated,
  onCancel,
}) {
  const [values, setValues] = useState(() => mapBookToFormValues(book));
  const [selectedCover, setSelectedCover] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = mode === "edit";
  const existingCover = book?.image || "";

  useEffect(() => {
    setValues(mapBookToFormValues(book));
    setSelectedCover(null);
    setCoverPreview("");
    setErrors({});
    setStatusMessage("");
    setIsSuccess(false);
  }, [book]);

  useEffect(() => {
    if (!selectedCover) {
      setCoverPreview("");
      return undefined;
    }

    const objectUrl = URL.createObjectURL(selectedCover);
    setCoverPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedCover]);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }

  function handleCoverChange(event) {
    setSelectedCover(event.target.files?.[0] || null);
    setErrors((current) => ({ ...current, cover: "" }));
  }

  function handleRatingSelect(starValue) {
    setValues((current) => ({ ...current, rating: String(starValue) }));
    setErrors((current) => ({ ...current, rating: "" }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const { errors: validationErrors, payload } = validateBookPayload(values, {
      requireCover: !isEditMode && !selectedCover,
    });

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      setIsSuccess(false);
      setStatusMessage("Please fix the highlighted fields before submitting.");
      return;
    }

    try {
      setErrors({});
      setIsSubmitting(true);

      const requestPayload = {
        ...payload,
        cover: selectedCover || undefined,
      };

      const result = isEditMode
        ? await updateBook(book.id, requestPayload)
        : await createBook(requestPayload);

      if (isEditMode) {
        onBookUpdated?.(result.book);
      } else {
        onBookAdded?.(result.book);
        setValues(initialBookFormValues);
        setSelectedCover(null);
        setCoverPreview("");
      }

      setIsSuccess(true);
      setStatusMessage(
        successMessage ||
          (isEditMode
            ? "Book updated successfully and your shelf is already refreshed."
            : "Book added successfully and the collection has been updated.")
      );
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
        <h2>{heading}</h2>
      </div>

      <form className="add-book-form" onSubmit={handleSubmit} noValidate>
        <div className="full-width cover-preview-panel">
          <div className="cover-preview-frame">
            {coverPreview || existingCover ? (
              <img
                src={coverPreview || existingCover}
                alt={
                  values.title
                    ? `${values.title} cover preview`
                    : "Selected book cover preview"
                }
              />
            ) : (
              <div className="cover-preview-placeholder">
                Upload a cover so it appears in your shelf cards and book details.
              </div>
            )}
          </div>
          <div className="cover-preview-copy">
            <strong>{isEditMode ? "Current cover" : "Cover preview"}</strong>
            <span>
              {selectedCover
                ? `Selected file: ${selectedCover.name}`
                : isEditMode
                  ? "Choose a new image only if you want to replace the current one."
                  : "A cover image is required for new books."}
            </span>
          </div>
        </div>

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
                {"\u2605"}
              </button>
            ))}
          </div>
          {errors.rating ? <small>{errors.rating}</small> : null}
        </label>

        <label className="full-width">
          <span>{isEditMode ? "Replace Cover" : "Add Cover"}</span>
          <input type="file" accept="image/*" onChange={handleCoverChange} />
          {errors.cover ? <small>{errors.cover}</small> : null}
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
            {isSubmitting
              ? isEditMode
                ? "Saving..."
                : "Adding..."
              : submitLabel || (isEditMode ? "Save Changes" : "Add Book")}
          </button>
          {isEditMode && onCancel ? (
            <button
              className="add-book-submit secondary-submit"
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          ) : null}
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
