import { MongoClient } from 'mongodb'
const express = require('express')
const app = express()

app.get('/verses', function(req, res) {
    MongoClient.connect('mongodb://user:pass@ds147544.mlab.com:47544/book', function(err, db) {

        db.collection('en-itani', (err, collection) => {
            collection.find({}, { skip: 1, limit: 10 }).toArray((err, data) => {
                res.json(data)
            })
        })





    })

})

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})