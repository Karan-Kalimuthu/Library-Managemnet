const Book = require("../models/books");

//creating book
exports.createBook = (req, res, next) => {
    const book = new Book({ title: req.body.title, description: req.body.description, imagePath: req.body.imagePath, author: req.body.author });
    book.save()
        .then(createdBook => {
            createdBook.toObject();
            res.status(201).json({
                message: 'Posts added successfully',
                book: {
                    ...createdBook,
                    id: createdBook._id
                }
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Creating a post failed'
            })
        });
};

//getting all books
exports.getBooks = (req, res, next) => {
    let fetchedBooks;
    Book.find()
        .then(books => {
            fetchedBooks = books;
            return Book.count();
        })
        .then(count => {
            res.status(200).json({
                message: 'Books fetched successfully!',
                books: fetchedBooks,
                maxBooks: count
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Fetching posts failed'
            })
        });
};

//getting single book
exports.getBook = (req, res, next) => {
    Book.findById(req.params.id)
        .then(book => {
            if (book) {
                res.status(200).json(book);
            } else {
                res.send(404).json({ message: 'Book not found!' });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Fetching post failed',
                error
            });
        });
};

//updating book
exports.updateBook = (req, res, next) => {
    console.log("hited update");
    const book = new Book({ _id: req.body.id, title: req.body.title, description: req.body.description, imagePath: req.body.imagePath, author: req.body.author });
    console.log("hited update", book);
    Book.updateOne({ _id: req.body.id }, book)
        .then(result => {
            console.log("hited update", result);
            res.status(200).json({ message: 'Updated Successfully!' });
        })
        .catch(error => {
            res.status(500).json({
                message: "couldn't update book!"
            })
        })
}


// deleting single book
exports.deleteBook = (req, res, next) => {
    console.log("hitted ")
    Book.deleteOne({ _id: req.params.id })
        .then((result) => {
            res.status(200).json({ message: 'Deletion Succesful!' });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Deleting book failed'
            })
        });
}