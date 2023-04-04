import { Book } from "../models/book.js";
import { Author } from "../models/author.js";
import { Genre } from "../models/genre.js";
import { BookInstance } from "../models/bookInstance.js";
import async, { find } from "async";
import { body, validationResult } from "express-validator";

// TODO: Implement Async

export const index = async (req, res) => {
  const book_count = await Book.countDocuments({});
  const book_instance_count = await BookInstance.countDocuments({});
  const book_instance_available_count = await BookInstance.countDocuments({
    status: "Available",
  });
  const author_count = await Author.countDocuments({});
  const genre_count = await Genre.countDocuments({});
  const data = {
    book_count,
    book_instance_count,
    book_instance_available_count,
    author_count,
    genre_count,
  };
  res.render("index", { title: "Local Library Home", data });
};

// Display list of all books.
export const book_list = async (req, res, next) => {
  const list_books = await Book.find({}, "title author")
    .sort({ title: 1 })
    .populate("author");

  //Successful, so render
  res.render("book_list", { title: "Book List", book_list: list_books });
};

// Display detail page for a specific book.
export const book_detail = async (req, res) => {
  const book = await Book.findById(req.params.id)
    .populate("author")
    .populate("genre");
  const book_instance = await BookInstance.find({ book: req.params.id });

  res.render("book_detail", {
    title: book.title,
    book,
    book_instances: book_instance,
  });
};

// Display book create form on GET.
export const book_create_get = async (req, res) => {
  const authors = await Author.find({});
  const genres = await Genre.find({});
  res.render("book_form", { title: "Create book", authors, genres });
};

// Handle book create on POST.
export const book_create_post = (req, res) => [
  // Convert the genre to an array.
  (req, res, next) => {
    if (!Array.isArray(req.body.genre)) {
      req.body.genre =
        typeof req.body.genre === "undefined" ? [] : [req.body.genre];
    }
    next();
  },

  // Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author", "Author must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summary must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
  body("genre.*").escape(),

  // Process request after validation and sanitization.
  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped and trimmed data.
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      const authors = await Author.find({});
      const genres = await Genre.find({});
      // Get all authors and genres for form.

      // Mark our selected genres as checked.
      for (const genre of results.genres) {
        if (book.genre.includes(genre._id)) {
          genre.checked = "true";
        }
      }
      res.render("book_form", {
        title: "Create Book",
        authors,
        genres,
        book,
        errors: errors.array(),
      });
      return;
    }

    // Data from form is valid. Save book.
    book.save();
    // Successful: redirect to new book record.
    res.redirect(book.url);
  },
];

// Display book delete form on GET.
export const book_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Book delete GET");
};

// Handle book delete on POST.
export const book_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Book delete POST");
};

// Display book update form on GET.
export const book_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Book update GET");
};

// Handle book update on POST.
export const book_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Book update POST");
};
