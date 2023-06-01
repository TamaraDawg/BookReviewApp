const router = require('express').Router();

router.get("/", (req, res) => {
    const key = process.env.API;
    res.json(key);
});

module.exports = router;