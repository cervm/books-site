module.exports = (dal) => {
    let express = require('express');
    let router = express.Router();

    router.get('/', (req, res) => {
        dal.getCategories().then(categories => res.json(categories));
    });

    router.post('/', (req, res) => {
        let newCategory = {
            alias: req.body.alias,
            name: req.body.name,
        };
        dal.createCategory(newCategory).then(newCategory => res.json(newCategory));
    });

    return router;
};