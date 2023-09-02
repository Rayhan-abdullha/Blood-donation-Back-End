const router = require("express").Router();

router
  .route("/api/v1/auth")
  .get((req, res) => {
    res.send("hello");
  })
  .post();

module.exports = router;
