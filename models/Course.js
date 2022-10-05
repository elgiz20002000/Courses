const path = require('path') ,
fs = require('fs') ,
uuid = require('uuid')
class Course {
    constructor(name , price , img) {
        this.name = name
        this.price = price
        this.img = img
    }

    getCurrentData() {
        return {
            name:this.name ,
            price:this.price ,
            img: this.img ,
            id: uuid.v4()
        }
    }

    static async update(course) {
        const courses = await Course.getAll()
        let index = courses.findIndex(item => item.id == course.id)
        courses[index] = course


        return  new Promise((resolve, reject) => {
                    fs.writeFile(path.join(__dirname , '..' , 'data' , 'Courses.json') , JSON.stringify(courses) , (err) => {
                        if(err) {
                            reject(err)
                        } else {
                            resolve()
                        }
                    })
                })
    }

    async save() {
        let courses = await Course.getAll()
        courses.push(this.getCurrentData())

        return  new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname , '..' , 'data' , 'Courses.json') , JSON.stringify(courses) , (err) => {
                if(err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })

    }

    // static

    static async getAll() {
        return await new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname , '..' , 'data' , 'Courses.json') , 'utf-8' , (err , data) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(data))
                }
            })
        })
    }

    
    static async getById(id) {
        let courses = await Course.getAll()
        return courses.find(item => item.id == id)
    }   
}




module.exports = Course