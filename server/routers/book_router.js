module.exports = (dal) => {
    let express = require('express');
    let router = express.Router();

    router.get('/', (req, res) => {
        dal.getBooks().then(books => res.json(books));
    });

    router.get('/:id', (req, res) => {
        let id = req.params.id;
        dal.getBook(id).then(book => res.json(book));
    });

    router.get('/category/:alias', (req, res) => {
        let alias = req.params.alias;
        dal.getBooks(alias).then(books => res.json(books));
    });

    router.post('/', (req, res) => {
        let newBook = {
            text : req.body.text,
            answers : []
        };
        dal.createBook(newBook).then(newBook => res.json(newBook));
    });

    return router;
};