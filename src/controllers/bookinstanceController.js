import { BookInstance } from "../models/bookInstance.js";

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
export const bookinstance_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance create GET");
};

// Handle BookInstance create on POST.
export const bookinstance_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance create POST");
};

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
