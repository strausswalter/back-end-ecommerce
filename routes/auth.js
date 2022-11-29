const express = require('express');
const router = express.Router();

router.get("/", async (req, res) => {
    res.send('Ola mundo Auth!!');
})

module.exports = router;