const express = require('express');
const router = express.Router();

const Product = require('../../models/Product');

router.get('/', (req, res) => {
    Product.find()
        .sort({ date: 1 })
        .then(products => res.json(products));
})

router.post('/', (req, res) => {
    newProduct = new Product({
        name: req.body.name,
        type: req.body.type
    });

    newProduct.save().then(product => res.json(product));
})

router.delete('/:id', (req, res) => {

    Product.findById(req.params.id)
        .then(product => {
            product
                .remove()
                .then(product => res.send({ message: 'product deleted successfully' })
                    .catch(err => res.status(500).send({
                        message: "error while removing the object",
                        error: err
                    })));
        })
        .catch(err => res.status(404).send({
            message: "Product not found",
            error: err
        }))

})

module.exports = router;