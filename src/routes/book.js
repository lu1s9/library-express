import express from "express";
const router = express.Router();
import * as book_controller from "../controllers/bookController.js";
/// BOOK ROUTES ///

// GET catalog home page.
router.get("/index", book_controller.index);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get("/create", book_controller.book_create_get);

// POST request for creating Book.
router.post("/create", book_controller.book_create_post);

// GET request to delete Book.
router.get("/:id/delete", book_controller.book_delete_get);

// POST request to delete Book.
router.post("/:id/delete", book_controller.book_delete_post);

// GET request to update Book.
router.get("/:id/update", book_controller.book_update_get);

// POST request to update Book.
router.post("/:id/update", book_controller.book_update_post);

// GET request for one Book.
router.get("/:id", book_controller.book_detail);

// GET request for list of all Book items.
router.get("/", book_controller.book_list);

export default router;
