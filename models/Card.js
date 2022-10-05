const fs = require('fs') ,
path = require('path')

class Card {
   static async add(course) {
        const card = await Card.fetch() ,
        idx = card.courses.findIndex(c => c.id === course.id) ,
        candidate = card.courses[idx]
        if(candidate) {
            candidate.count++
            card.courses[idx] = candidate
        } else {
            course.count = 1
            card.courses.push(course)
        }

        card.price+= +course.price
        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname , '..' , 'data' , 'card.json') , JSON.stringify(card) , (err) => {
                if(err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    static async fetch() {
        return new Promise((resolve , reject) => {
            fs.readFile(path.join(__dirname , '..' , 'data' , 'card.json') , 'utf-8' , (err , data) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(data))
                }
            })
        })
    }

    static async delete(id) {   
        let card = await Card.fetch(),
        idx = card.courses.findIndex(item => item.id === id),
        course = card.courses[idx]
        if(course.count === 1) {
          card.courses = card.courses.filter(item => item.id !== id)
        } else {
            card.courses[idx].count--
        }
        card.price -= course.price

        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname , '..' , 'data' , 'card.json') , JSON.stringify(card) , (err) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(card)
                }
            })
        })
    }
}


module.exports = Card