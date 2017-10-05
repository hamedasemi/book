import Express, { Router } from 'express'

let router = new Router();


router.get('/', (req, res) => {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/verses').get((req, res) => {
    res.json({ message: 'Verses reosurce is available' })
});

export default router;