const express = require("express");

const BookController = require('../controllers/book');
const extractFile = require('../middleware/file');


const router = express.Router();

router.post("/", BookController.createBook);

router.get("/", BookController.getBooks);

router.get("/:id", BookController.getBook);

router.put("/:id", BookController.updateBook);

router.delete("/:id", BookController.deleteBook);

module.exports = router;