import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import main from "./config/db.js";

import indexRouter from "./routes/index.js";
import authorRouter from "./routes/author.js";
import bookRouter from "./routes/book.js";
import genreRouter from "./routes/genre.js";
import bookInstanceRouter from "./routes/bookInstance.js";

const app = express();

app.use("/", indexRouter);
app.use("/books", bookRouter);
app.use("/authors", authorRouter);
app.use("/genres", genreRouter);
app.use("/bookInstances", bookInstanceRouter);

app.use("/public", express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  main();
  res.render("index", { title: "titulo 2" });
});

app.use((req, res, next) => {
  res.status(404).send("Pagina no encontrada");
});

export default app;
