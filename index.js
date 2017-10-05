import { MongoClient } from 'mongodb'
const express = require('express')
const app = express()

MongoClient.connect('mongodb://user:pass@ds147544.mlab.com:47544/book', function(err, db) {
    db.collection('verses', (err, collection) => {
        app.get('/verses', function(req, res) {

            let fileds = { _id: 0 }
            if (req.query.editions && typeof req.query.editions !== 'string') {
                req.query.editions.map((edition) => {
                    Object.assign(fileds, {
                        [edition]: 1
                    })
                });
            } else if (req.query.editions) {
                Object.assign(fileds, {
                    [req.query.editions]: 1
                })
            }


            collection.find({}, fileds, { skip: parseInt(req.query.skip), limit: parseInt(req.query.limit) }).toArray((err, data) => {
                res.json(data)
            })
        })
    })

})

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})