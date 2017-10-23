import { MongoClient } from 'mongodb'
import fs from 'fs'
var readline = require('readline');
var stream = require('stream');


let files = fs.readdirSync('./source/')

let books = Array(6136).fill({});
files.map((file) => {
    MongoClient.connect('mongodb://localhost:27017/book', function(err, db) {

        let name = file.replace('.txt', '').replace('.', '-');

        var instream = fs.createReadStream('./source/' + file);
        var outstream = new stream;
        var rl = readline.createInterface(instream, outstream);
        let index = 0;
        rl.on('line', function(line) {
            if (line && line[0] !== '#') {
                books[index] = Object.assign({}, books[index], {
                    [name]: line
                })

                index = index + 1;

            }
        });

        rl.on('close', function() {
            // console.log(books)



            db.createCollection('verses', {}, (err, collection) => {
                books.map((book) => {
                    collection.insert(book)
                });

                // db.close();
            })

        });
        // console.log(file)
    })

})