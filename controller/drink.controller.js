const Drink = require('../models/Drink.model'); 


    const createDrink = async (req, res, next) => {
    const { title, content } = req.body;
    const { _id: userId  } = req.session.currentUser;
    console.log('req.file: ', req.file);

    if(!req.file) {
        next(new Error('No file uploaded'))
    }

    const drink = await Drink.create({
        userId,
        title,
        content,
        imageName: title,
        imageUrl: req.file.path
    });
    
    res.redirect(`/drink/${drink._id}/detail`)
    }


    const getOneDrink = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log('id: ', id);
        const { 
        _id,
        imageUrl,
        imageName,
        title,
        content,
        comments,
        userId: userPostInfo, 
        createdAt
        } = await drink.findById(id)
        .populate('userId')
        .populate({
        path: 'comments',
        populate: {
            path: 'userId', 
            model: 'User'
        }
        })
        console.log('este es el user que creo el post', userPostInfo);
        console.log('comments: ', comments);
        const size = 'col-8'
        res.render('post/detail-image-post', { 
        _id, 
        imageUrl, 
        imageName, 
        title, 
        content, 
        size,
        comments,
        userPostInfo 
        }) 
    } catch (error) {
        next(error)
    }
    }

    const getAllDrinks= async (req, res, next) => {

        const cardArray = await Drink.find();
        const data = {
            rows: []
        };
        
        let currentRow = {
            columns: []
        };
        let currentColumn = {
            columnClass: "",
            cards: []
        };
        
        for (let i = 0; i < cardArray.length; i++) {
            if (currentColumn.cards.length === 4) {
            
            currentRow.columns.push(currentColumn);
        
            
            currentColumn = {
                columnClass: "",
                cards: []
            };
            }
        
            if (currentRow.columns.length === 3) {
            
            data.rows.push(currentRow);
        
            
            currentRow = {
                columns: []
            };
            }
        
            if (currentColumn.cards.length === 0) {
            
            const randArray = generateRandomArray();
            for(const colNum of randArray) 
                currentColumn.columnClass = `col-${colNum}`;
            }
        
            currentColumn.cards.push(cardArray[i]);
        }
        
        if (currentColumn.cards.length > 0) {
            currentRow.columns.push(currentColumn);
        }
        if (currentRow.columns.length > 0) {
            data.rows.push(currentRow);
        }
        

        console.log('data: ', data);
        console.log('rows: ', data.rows);

        res.render('index', { rows: data.rows })
    }

    function generateRandomArray() {
    const num1 = Math.floor(Math.random() * 4) + 3;
    const num2 = Math.floor(Math.random() * (10 - num1 - 3)) + 3;
    const num3 = 12 - (num1 + num2);
    return [num1, num2, num3];
    }

    module.exports = {
        getAllDrinks,
        getOneDrink,
        createDrink
    };
