import { MongoClient } from 'mongodb'
import fs from 'fs'
var readline = require('readline');
var stream = require('stream');
var Datastore = require('nedb'),
    db = new Datastore();

db.loadDatabase();

let files = fs.readdirSync('./source/')
let promises = [];
let books = Array(6236).fill({});
files.map((file) => {
    let mypromise = new Promise((resolve, reject) => {
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
            db.insert(books, (err, newDoc) => {
                console.log(newDoc)
                resolve();
            })



        });
    });

    promises.push(mypromise);


})

Promise.all(promises).then(() => {
    console.log('data')
    db.find({}, {
        ['fa-makarem']: 1
    }, (err, data) => {
        console.log(data)
    })
});