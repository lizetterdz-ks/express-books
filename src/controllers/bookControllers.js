// Models
const { Book } = require('../models');

const { validationResult } = require('express-validator');

// Fecth all books
const getAll = (req, res) => {
  Book.getAll((books) => {
    res.send(books);
  });
};

// Get book by guid
const getByGuid = (req, res) => {
  const { guid } = req.params;
  // Read all book
  Book.getAll((books) => {
    // Filter by guid
    const book = books.find(ent => ent.guid === guid);

    if (book) {
      res.send(book);
    } else {
      res.status(404).send({
        message: 'Ups!!! Book not found.',
      });
    }
  });
};

// Add new book to books
const addBook = (req, res) => {
  const { body } = req;

  //Handling validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()/*[0].msg*/ });
  }
  
  // Create new instance
  const newBook = new Book(body);
  // Save in db
  newBook.save();
  res.send({
    message: 'Book successfully added!!!',
    guid: newBook.getGuid(),
  });
};

// Update an existing book
const updateBook = (req, res) => {
  const { params: { guid }, body } = req;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  // Read all book
  Book.getAll((books) => {
    // Filter by guid
    const book = books.find(ent => ent.guid === guid);

    if (book) {
      Object.assign(book, body);
      Book.update(books);
      res.send({
        message: 'Book successfully updated!!!',
      });
    } else {
      res.status(404).send({
        message: 'Ups!!! Book not found.',
      });
    }
  });
};

// Delete book from books
const deleteBook = (req, res) => {
  const { guid } = req.params;
  // Read all book
  Book.getAll((books) => {
    // Filter by guid
    const bookIdx = books.findIndex(ent => ent.guid === guid);

    if (bookIdx !== -1) {
      books.splice(bookIdx, 1);
      Book.update(books);
      res.send({
        message: 'Book successfully deleted!!!',
      });
    } else {
      res.status(404).send({
        message: 'Ups!!! Book not found.',
      });
    }
  });
};

module.exports = {
  getAll,
  getByGuid,
  addBook,
  updateBook,
  deleteBook,
};
