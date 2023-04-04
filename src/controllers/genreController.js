import { Genre } from "../models/genre.js";
import { Book } from "../models/book.js";
import { body, validationResult } from "express-validator";

// Display list of all Genre.
export const genre_list = async (req, res) => {
  const list_genres = await Genre.find({}).sort({ name: 1 });
  res.render("genre_list", { title: "Genre List", genre_list: list_genres });
};

// Display detail page for a specific Genre.
export const genre_detail = async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  const genre_books = await Book.find({ genre: req.params.id });

  res.render("genre_detail", { title: "Genre Detail", genre, genre_books });
};

// Display Genre create form on GET.
export const genre_create_get = (req, res) => {
  res.render("genre_form", { title: "Create Genre" });
};

// Handle Genre create on POST.
export const genre_create_post = [
  body("name", "Genre name required").trim().isLength({ min: 1 }).escape(),

  async (req, res, next) => {
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    const genre = new Genre({ name: req.body.name });
    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("genre_form", {
        title: "Create Genre",
        genre,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Genre with same name already exists.
      const found_genre = await Genre.findOne({ name: req.body.name });

      if (found_genre) {
        // Genre exists, redirect to its detail page.
        res.redirect(found_genre.url);
      } else {
        genre.save();
        // Genre saved. Redirect to genre detail page.
        res.redirect(genre.url);
      }
    }
  },
];

// Display Genre delete form on GET.
export const genre_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre delete GET");
};

// Handle Genre delete on POST.
export const genre_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre delete POST");
};

// Display Genre update form on GET.
export const genre_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre update GET");
};

// Handle Genre update on POST.
export const genre_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre update POST");
};
