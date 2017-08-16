const express = require('express');
const router = express.Router();
const execShell = require('../lib/execShell');

/* POST /cmd */
router.post('/', (req, res, next) => {
  let cmd = req.body.cmd;
  if (!cmd) {
    let err = new Error("Missing or invalid 'cmd' field.");
    err.status = 400;
    return next(err);
  }
  execShell.async(cmd, (err, stdout, stderr) => {
    res.status(err ? 500 : 200).json({
      err: err,
      stdout: stdout,
      stderr: stderr
    });
  });
});

module.exports = router;
