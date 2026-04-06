const rawBaseUrl =
  import.meta.env.VITE_API_BASE_URL?.trim() || "http://localhost:3001";

const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");

export function getApiBaseUrl() {
  return API_BASE_URL;
}

function buildOpenLibraryCoverUrl(formats) {
  const isbn = formats?.find((format) => format?.isbn)?.isbn;

  if (!isbn) {
    return null;
  }

  return `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`;
}

export function buildImageUrl(imagePath) {
  if (!imagePath) {
    return `${import.meta.env.BASE_URL}assets/homepage/books.png`;
  }

  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  return `${API_BASE_URL}${imagePath.startsWith("/") ? imagePath : `/${imagePath}`}`;
}

export function normalizeBook(book) {
  const formats = Array.isArray(book.formats) ? book.formats : [];

  return {
    id: book._id,
    title: book.title,
    author: book.author,
    genre: book.genre,
    rating: book.rating,
    publicationYear: book.publication_year,
    pageCount: book.page_count,
    description: book.description,
    features: Array.isArray(book.features) ? book.features : [],
    formats,
    image: buildOpenLibraryCoverUrl(formats) || buildImageUrl(book.main_image),
    fallbackImage: buildImageUrl(book.main_image),
  };
}

export async function fetchBooks() {
  const response = await fetch(`${API_BASE_URL}/api/books`);

  if (!response.ok) {
    throw new Error(`Unable to load books: ${response.status}`);
  }

  const data = await response.json();
  return data.map(normalizeBook);
}

export async function fetchBookById(id) {
  const response = await fetch(`${API_BASE_URL}/api/books/${id}`);

  if (!response.ok) {
    throw new Error(`Unable to load book: ${response.status}`);
  }

  const data = await response.json();
  return normalizeBook(data);
}
