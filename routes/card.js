const {Router} = require('express')  ,
router = Router() ,
Course = require('../models/Course') ,
Card = require('../models/Card') 


router.post('/add' , async (req , res) => {
    const course = await Course.getById(req.body.id)
    await Card.add(course)
    res.redirect('/card')
})


router.delete('/remove/:id' , async (req , res) => {
    let card =  await Card.delete(req.params.id)
    res.status(200).json(card)
})


router.get('/' , async (req , res) => {
    const card = await Card.fetch()
    res.render('card' , {
        title: 'Card' ,
        courses:card.courses,
        price:card.price,
        isCart:true
    })
})



module.exports = router
