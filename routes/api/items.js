const express = require('express');
const router = express.Router();

//Item model

const Item = require('../../models/Item');

//@route GET api/items
//@desc GET all items
//@access PUBLIC

router.get('/', (req, res) => {
    Item.find()
        .sort({date: 1,priority:-1 })
        .then(items => res.json(items))
})

//@route POST api/items
//@desc CREATE an item
//@access PUBLIC

router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        url: req.body.url,
    });

    newItem
        .save()
        .then(item => res.json(item));

})

//@route DELETE api/items
//@desc DELETE an item by an ID
//@access PUBLIC
router.delete('/:id', (req, res) => {

    Item.findById(req.params.id)
        .then(item => item.remove()
            .then(item => res.send({ message: 'success', item: item }))
            .catch(err => {
                res.status(500).send({ message: 'A server error occured', error: err })
                console.log("ERROR: ", err)
            }))
        .catch(err => {
            console.log("ERROR :", err)
            res.status(404).send({ message: 'No id was found', id: req.params.id })
        })

})

module.exports = router;