const express = require("express");

const BookController = require('../controllers/book');
const extractFile = require('../middleware/file');


const router = express.Router();

router.post("/", extractFile, BookController.createBook);

router.get("/", BookController.getBooks);

router.get("/:id", BookController.getBook);

router.put("/:id", extractFile, BookController.updateBook);

router.delete("/:id", BookController.deleteBook);

module.exports = router;