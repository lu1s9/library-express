import { Author } from "../models/author.js";
import { Book } from "../models/book.js";

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
  res.send("NOT IMPLEMENTED: Author create GET");
};

// Handle Author create on POST.
export const author_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Author create POST");
};

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
