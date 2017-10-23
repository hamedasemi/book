import Express, { Router } from 'express'
import { MongoClient } from 'mongodb'

import router from './api/v1'

let express = new Express();

express.use('/api/v1', router);



const port = process.env.PORT || 8080;

express.listen(port);
console.log('Magic happens on port', port);