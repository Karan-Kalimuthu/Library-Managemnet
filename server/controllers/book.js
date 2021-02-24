const Book = require("../models/books");

//creating book
exports.createBook = (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    const book = new Book({ title: req.body.title, description: req.body.description, imagePath: url + "/images/" + req.file.filename, author: req.body.author, creator: req.body.userId });
    console.log(book)
    book.save()
        .then(createdBook => {
            console.log(res)
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
            console.log(error)
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
                count
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

//updating single book



// deleting single book
exports.deleteBook = (req, res, next) => {
    console.log("hitted ")
    Book.deleteOne({ _id: req.params.id })
        .then((result) => {
            if (result.n > 0) {
                res.status(200).json({ message: 'Deletion Succesful!' });
            } else {
                res.status(401).json({ message: 'Not Authorized to delete!' });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Deleting book failed'
            })
        });
}