import { Book } from "../models/book.js";
import { Author } from "../models/author.js";
import { Genre } from "../models/genre.js";
import { BookInstance } from "../models/bookInstance.js";
import async from "async";

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
export const book_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Book create GET");
};

// Handle book create on POST.
export const book_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Book create POST");
};

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
