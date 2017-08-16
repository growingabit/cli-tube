const express = require('express');
const router = express.Router();

/* GET root (for healthchecks) */
router.get('/', (req, res) => {
  res.status(200).json({
    message: "cli-tube is alive",
    error: {},
  });
});

module.exports = router;
