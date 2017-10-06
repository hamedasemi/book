import Express, { Router } from 'express'
import { MongoClient } from 'mongodb'

let router = new Router()


router.get('/', (req, res) => {
    res.json({ message: 'hooray! welcome to our api!' })
});

router.route('/verses').get((req, res) => {
    MongoClient.connect('mongodb://user:pass@ds147544.mlab.com:47544/book', function(err, db) {
        if (err) {
            console.error(err);
            res.status(500).json(err);
        }
        db.collection('verses', (err, collection) => {
            if (err) {
                console.error(err);
                res.status(500).json(err);
            }
            let fileds = { _id: 0 }

            if (req.query.editions && typeof req.query.editions === 'object') {
                req.query.editions.map((edition) => {
                    fileds = Object.assign(fileds, {
                        [edition]: 1
                    })
                })
            } else if (req.query.editions && typeof req.query.editions === 'string') {
                fileds = Object.assign(fileds, {
                    [req.query.editions]: 1
                })
            }

            req.query.skip = parseInt(req.query.skip)
            req.query.limit = parseInt(req.query.limit)

            collection.find({}, fileds, req.query).toArray((err, data) => {
                res.json(data)
            })
        })
    })
})

export default router;