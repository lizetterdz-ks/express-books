const { checkSchema } = require('express-validator'); 
const { Book } = require('../models');

const validateNew = checkSchema({
    title: {
        exists: {
            options: {checkFalsy: true},
            errorMessage: 'Title is missing!!!'
        },
        isString: true,
        isLength: {
            options: { min: 1 },
        },
        errorMessage: 'Title is invalid!!!'
    },
    author: {
        exists: {
            options: {checkFalsy: true},
            errorMessage: 'Author is missing!!!'
        },
        isString: true,
        isLength: {
            options: { min: 1 },
        },
        errorMessage: 'Author name is invalid!!!'
    },
    year: {
        exists: {
            options: {checkFalsy: true},
            errorMessage: 'Year is missing!!!'
        },
        isInt: {
            options: { min: 1455, max: 2021 }
        },
        isNumeric: {
            options: {no_symbols: true}
        },
        errorMessage: 'Year is invalid!!!',
        toInt: true,
    }
})

function duplicated(req,res,next){
    let book; 
    Book.getAll((books)=> {
        book = (books.find(ent => (ent.title === req.body.title && ent.author === req.body.author && ent.year === req.body.year) ? false : true ));
        if (book){ 
            next();
        } else {
            res.status(404).send({
                message:  'Book already exists in database'
            });
        }
    });  
}

const validateUpdate = checkSchema({
    title: {
        optional: {
            options: true
        },
        isString: true,
        isLength: {
            options: { min: 1 },
        },
        errorMessage: 'Title is invalid!!!'
    },
    author: {
        optional: {
            options: true
        },
        isString: true,
        isLength: {
            options: { min: 1 },
        },
        errorMessage: 'Author name is invalid!!!'
    },
    year: {
        optional: {
            options: true
        },
        isInt: {
            options: { min: 1455, max: 2021 }
        },
        isNumeric: {
            options: {no_symbols: true}
        },
        errorMessage: 'Year is invalid!!!',
        toInt: true,
    },
});

module.exports = {
    validateNew,
    duplicated,
    validateUpdate
};