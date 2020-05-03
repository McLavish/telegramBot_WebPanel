const express = require('express');
const router = new express.Router();

router.get('/', async (req, res) => {
    if (req.query.logged)
        res.render("index", {logged: true});
    else
        res.render("index", {logged: false});
});

module.exports = router;
