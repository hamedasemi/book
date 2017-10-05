import { MongoClient } from 'mongodb'
import fs from 'fs'
var readline = require('readline');
var stream = require('stream');


let files = fs.readdirSync('./resources/')

files.map((file, index) => {
    MongoClient.connect('mongodb://user:pass@ds147544.mlab.com:47544/book', function(err, db) {

        db.createCollection(file.replace('.txt', '').replace('.', '-'), {}, (err, collection) => {
            let name = file.replace('.txt', '').replace('.', '-');


            var instream = fs.createReadStream('./resources/' + file);
            var outstream = new stream;
            var rl = readline.createInterface(instream, outstream);

            rl.on('line', function(line) {
                if (line && line[0] !== '#') {
                    collection.insert({
                        [name]: line
                    })
                }
            });

            // db.close();
        })




    })
    console.log(file)
})





// MongoClient.connect('mongodb://user:pass@ds147544.mlab.com:47544/book', function(err, db) {

//     db.enitani.insertOne({ name: 'hamed' })




// })