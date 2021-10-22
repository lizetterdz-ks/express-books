// Modules
const express = require('express');
const BookResources = express.Router();

// Controllers
const { BookControllers } = require('../controllers');

//Validations
const { Validations } = require('../validation');

// All book resources
BookResources.get('/', BookControllers.getAll);
BookResources.post('/', Validations.validateNew, Validations.duplicated, BookControllers.addBook);
BookResources.get('/:guid', BookControllers.getByGuid);
BookResources.put('/:guid', Validations.validateUpdate, BookControllers.updateBook);
BookResources.delete('/:guid', BookControllers.deleteBook);

module.exports = BookResources;
