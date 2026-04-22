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

const initialBookFormValues = {
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

function formatFeatures(features) {
  return Array.isArray(features) ? features.join(", ") : "";
}

function getPrimaryFormat(formats) {
  if (Array.isArray(formats) && formats.length > 0) {
    return formats[0];
  }

  return {};
}

export function mapBookToFormValues(book) {
  if (!book) {
    return initialBookFormValues;
  }

  const primaryFormat = getPrimaryFormat(book.formats);

  return {
    title: book.title ?? "",
    author: book.author ?? "",
    genre: book.genre ?? initialBookFormValues.genre,
    publication_year: book.publicationYear ? String(book.publicationYear) : "",
    page_count: book.pageCount ? String(book.pageCount) : "",
    rating: book.rating ? String(book.rating) : "",
    description: book.description ?? "",
    features: formatFeatures(book.features),
    format_type: primaryFormat.type ?? initialBookFormValues.format_type,
    isbn: primaryFormat.isbn ?? "",
    price: primaryFormat.price ?? "",
  };
}

export function validateBookPayload(values, options = {}) {
  const { requireCover = false } = options;
  const errors = {};
  const trimmedFeatures = values.features
    .split(",")
    .map((feature) => feature.trim())
    .filter(Boolean);

  if (requireCover) {
    errors.cover = "Add a book cover image before submitting.";
  }

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
  if (
    !Number.isInteger(publicationYear) ||
    publicationYear < 1000 ||
    publicationYear > currentYear
  ) {
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

export { formatOptions, genreOptions, initialBookFormValues };
