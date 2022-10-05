const express = require('express') ,
app = express() ,
express_handlebars = require('express-handlebars') ,
mainRouter = require('./routes/main') ,
coursesRouter = require('./routes/courses') ,
addRouter = require('./routes/add'),
cardRouter = require('./routes/card')

const PORT =  process.env.PORT || 3000


const handlebars = express_handlebars.create({
    defaultLayout:'main' ,
    extname:'hbs'
})


app.engine('hbs' , handlebars.engine)
app.set('view engine' , 'hbs')
app.set('views' , 'views')

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

app.use('/' , mainRouter)
app.use('/courses' , coursesRouter)
app.use('/add' , addRouter)
app.use('/card' , cardRouter)








app.listen(PORT , () => {
    console.log(`server is running in port ${PORT}`);
})

