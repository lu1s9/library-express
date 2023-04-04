import { Author } from "../models/author.js";
import { Book } from "../models/book.js";
import { body, validationResult } from "express-validator";

// Display list of all Authors.
export const author_list = async (req, res) => {
  const list_authors = await Author.find({}).sort([
    ["family_name", "ascending"],
  ]);
  res.render("author_list", {
    title: "Author list",
    author_list: list_authors,
  });
};

// Display detail page for a specific Author.
export const author_detail = async (req, res) => {
  const author = await Author.findById(req.params.id);
  const authors_books = await Book.find(
    { author: req.params.id },
    "title summary"
  );

  res.render("author_detail", {
    title: "Author Detail",
    author,
    author_books: authors_books,
  });
};

// Display Author create form on GET.
export const author_create_get = (req, res) => {
  res.render("author_form", { title: "Create author" });
};

// Handle Author create on POST.
export const author_create_post = [
  // Validate and sanitize fields.
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("family_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified.")
    .isAlphanumeric()
    .withMessage("Family name has non-alphanumeric characters."),
  body("date_of_birth", "Invalid date of birth")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  body("date_of_death", "Invalid date of death")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("author_form", {
        title: "Create Author",
        author: req.body,
        errors: errors.array(),
      });
      return;
    }
    // Data from form is valid.

    // Create an Author object with escaped and trimmed data.
    const author = new Author({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
    });
    author.save();
    // Successful - redirect to new author record.
    res.redirect(author.url);
  },
];

// Display Author delete form on GET.
export const author_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Author delete GET");
};

// Handle Author delete on POST.
export const author_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Author delete POST");
};

// Display Author update form on GET.
export const author_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Author update GET");
};

// Handle Author update on POST.
export const author_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Author update POST");
};
