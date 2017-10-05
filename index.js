import Express, { Router } from 'express'
import { MongoClient } from 'mongodb'

import router from './api'

let express = new Express();

express.use('/api', router);



const port = process.env.PORT || 8080;

express.listen(port);
console.log('Magic happens on port', port);