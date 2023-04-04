import { BookInstance } from "../models/bookInstance.js";
import { body, validationResult } from "express-validator";
import { Book } from "../models/book.js";

// Display list of all BookInstances.
export const bookinstance_list = async (req, res, next) => {
  const list_bookinstances = await BookInstance.find({}).populate("book");

  //Successful, so render
  res.render("bookinstance_list", {
    title: "Book Instance List",
    bookinstance_list: list_bookinstances,
  });
};

// Display detail page for a specific BookInstance.
export const bookinstance_detail = async (req, res) => {
  const bookinstance = await BookInstance.findById(req.params.id).populate(
    "book"
  );
  res.render("bookinstance_detail", {
    title: `Copy ${bookinstance.book.title}`,
    bookinstance,
  });
};

// Display BookInstance create form on GET.
export const bookinstance_create_get = async (req, res) => {
  const books = await Book.find({}, "title");
  res.render("bookinstance_form", {
    title: "Create BookInstance",
    book_list: books,
  });
};

// Handle BookInstance create on POST.
export const bookinstance_create_post = (req, res) => [
  // Validate and sanitize fields.
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("due_back", "Invalid date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization.
  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a BookInstance object with escaped and trimmed data.
    const bookinstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values and error messages.
      const books = await Book.find({}, "title");
      // Successful, so render.
      res.render("bookinstance_form", {
        title: "Create BookInstance",
        book_list: books,
        selected_book: bookinstance.book._id,
        errors: errors.array(),
        bookinstance,
      });
      return;
    }

    bookinstance.save();
    res.redirect(bookinstance.url);
  },
];

// Display BookInstance delete form on GET.
export const bookinstance_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance delete GET");
};

// Handle BookInstance delete on POST.
export const bookinstance_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance delete POST");
};

// Display BookInstance update form on GET.
export const bookinstance_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance update GET");
};

// Handle bookinstance update on POST.
export const bookinstance_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance update POST");
};
