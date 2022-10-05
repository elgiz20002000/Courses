const {Router} = require('express')
const router = Router() 
const Course = require('../models/Course')

router.get('/' , async (req , res) => {
    res.render('courses' , {
        title:'Courses' ,
        isCourses:true ,
        courses: await Course.getAll()
    })
})


router.get('/:id/edit' , async (req , res) => {
    if(!req.query.allow){
       return res.redirect('/')
    }
    const course = await Course.getById(req.params.id)
    res.render('course_edit' , {
        title:`Edit ${course.name}` ,
        course
    })
})

router.post('/edit' , async (req , res) => {
    await Course.update(req.body)
    res.redirect('/courses')
})


router.get('/:id' , async (req , res) => {
    let course = await Course.getById(req.params.id)
    res.render('course' , {
        layout:'empty',
        title:`Course ${course.name}`,
        course
    })
})

module.exports = router