const drinkRouter = require("express").Router();
const { 
    getOneDrink,
    createDrink
}  = require('../controller/drink.controller');
const uploadImage = require('../middleware/cloudinary');


drinkRouter.get('/:id/detail', getOneDrink)
drinkRouter.post('/create', uploadImage.single('picture') , createDrink)

module.exports = drinkRouter;