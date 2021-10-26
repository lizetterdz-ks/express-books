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
        errorMessage: 'Title is invalid!!!',
        trim: true
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
        errorMessage: 'Author name is invalid!!!',
        trim: true
    },
    year: {
        exists: {
            options: {checkFalsy: true},
            errorMessage: 'Year is missing!!!'
        },
        isInt: {
            options: { min: 1455, max: new Date().getFullYear() }
        },
        isNumeric: {
            options: {no_symbols: true}
        },
        errorMessage: 'Year is invalid!!!',
        toInt: true,
        trim: true
    }
})

function duplicated(req,res,next){
    let book; 
    Book.getAll((books)=> {
        book = books.find(ent => ent.title === req.body.title) && books.find(ent => ent.author === req.body.author) && books.find(ent => ent.year === req.body.year)? false : true;
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
        errorMessage: 'Title is invalid!!!',
        trim: true
    },
    author: {
        optional: {
            options: true
        },
        isString: true,
        isLength: {
            options: { min: 1 },
        },
        errorMessage: 'Author name is invalid!!!',
        trim: true
    },
    year: {
        optional: {
            options: true
        },
        isInt: {
            options: { min: 1455, max: new Date().getFullYear() }
        },
        isNumeric: {
            options: {no_symbols: true}
        },
        errorMessage: 'Year is invalid!!!',
        toInt: true,
        trim: true
    },
});

module.exports = {
    validateNew,
    duplicated,
    validateUpdate
};