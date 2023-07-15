const express = require('express');
const router = express.Router();
const { 
  getAllDrinks,
}  = require('../controller/image-post.controller');
/* GET home page */
router.get("/",(req, res, next) => {
  res.render("index");
});

router.get("/cards",getAllDrinks);


module.exports = router;
