const express = require('express');
const router = express.Router();
const Campus = require('./models/campus');
const auth = require('../middleware/auth.js');
const { admin, gebruiker } = require("../middleware/roles.js");

router.get('/', (req, res) => {
    console.log('/ route called');
    res.send('<h1>Welcome to my API, these are the available routes:</h1>'

        +
        '<h2>/</h2>' +
        'Where you are right now'

        +
        '<hr/>'

        +
        '<h2>/campus</h2>' +
        'Returns all campuses in the database .find()'

        +
        '<hr/>'
    );
});

router.get('/campus', [auth, gebruiker], async(req, res) => {
    console.log('/campus route called');
    try {
        res.json(await Campus.find());
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/campus/:id', [auth, gebruiker], async(req, res) => {
    console.log('/campus/:id route called');
    try {
        res.json(await Campus.findById(req.params.id));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/campus/create', [auth, admin], async(req, res) => {
    console.log('/campus/create route called');
    try {
        res.send(await Campus.create(req.body));
    } catch (e) {
        console.log(e.message);
        res.status(500).send(e.message);
    }
});

router.put('/campus/update/:id', [auth, admin], async(req, res) => {
    console.log('/campus/update/:id route called');
    try {
        res.send(await Campus.findByIdAndUpdate(req.params.id, { $set: req.body }));
    } catch (e) {
        console.log(e);
        console.sendStatus(500);
    }
});

router.delete('/campus/delete/:id', [auth, admin], async(req, res) => {
    console.log('/campus/delete/:id route called');
    try {
        res.send(await Campus.findByIdAndDelete(req.params.id));
    } catch (e) {
        console.log(e);
        console.sendStatus(500);
    }
});

module.exports = router;