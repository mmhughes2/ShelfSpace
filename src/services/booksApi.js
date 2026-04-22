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
  const fallbackImage = buildImageUrl(book.main_image);
  const image = buildOpenLibraryCoverUrl(formats) || fallbackImage;

  return {
    id: book._id,
    title: book.title,
    author: book.author,
    genre: book.genre,
    rating: book.rating,
    publicationYear: book.publication_year,
    pageCount: book.page_count,
    description: book.description,
    tagline: book.tagline || book.description,
    features: Array.isArray(book.features) ? book.features : [],
    formats,
    image,
    fallbackImage,
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

export async function createBook(bookPayload) {
  const formData = new FormData();

  Object.entries(bookPayload).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    if (key === "features" || key === "formats") {
      formData.append(key, JSON.stringify(value));
      return;
    }

    formData.append(key, value);
  });

  const response = await fetch(`${API_BASE_URL}/api/books`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.errors?.join(" ") || "Unable to create book.");
  }

  return {
    message: data.message,
    book: normalizeBook(data.book),
  };
}

export async function updateBook(id, bookPayload) {
  const formData = new FormData();

  Object.entries(bookPayload).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    if (key === "features" || key === "formats") {
      formData.append(key, JSON.stringify(value));
      return;
    }

    formData.append(key, value);
  });

  const response = await fetch(`${API_BASE_URL}/api/books/${id}`, {
    method: "PUT",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.errors?.join(" ") || data?.message || "Unable to update book.");
  }

  return {
    message: data.message,
    book: normalizeBook(data.book),
  };
}

export async function deleteBook(id) {
  const response = await fetch(`${API_BASE_URL}/api/books/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Unable to remove book.");
  }

  return data;
}
