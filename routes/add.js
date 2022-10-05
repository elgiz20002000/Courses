const {Router} = require('express')
const router = Router()
const Course = require('../models/Course')

router.get('/' , (req , res) => {
    res.render('add' , {
        title:'Add course',
        isAdd:true
    })
})


router.post('/' , async (req , res) => {
    const data = req.body
    let course = new Course(data.course , data.price , data.img)

    await course.save()

    res.redirect('/')
})

module.exports = router