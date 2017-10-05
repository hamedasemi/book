import { MongoClient } from 'mongodb'
import fs from 'fs'

function getDb(url) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function(err, db) {
            if (!err) {
                resolve(db)
            } else {
                reject(err)
            }
        })
    })
}


function createCollection(url) {
    return new Promise((resolve, reject) => {
        files.map((file, index) => {
            MongoClient.connect(url, function(err, db) {

                console.log("Connected correctly to server", index, file);
                let name = file.replace('.txt', '').replace('.', '').replace('-', '')
                console.log(name)
                db.createCollection(name, {}, (err) => {
                    db.close();
                })


            })
        })
    })
}


function createCollections(db, files) {
    return new Promise((resolve, reject) => {
        files.map((file, index) => {
            db.createCollection(file, {}, (err) => {
                resolve()
            })
        })
    })
}





function getCollections(db) {
    return new Promise((resolve, reject) => {
        db.listCollections().toArray(function(err, collInfos) {
            resolve(collInfos)
        })
    })
}

function deleteCollection(db, name) {
    return new Promise((resolve, reject) => {
        if (name.substring(0, 6) !== "system") {
            db.dropCollection(name, function(err) {
                if (!err) {
                    console.log(name + " dropped");
                    resolve();
                } else {
                    console.log("!ERROR! " + err.errmsg);
                }
            });
        } else {
            console.log(name + " cannot be dropped because it's a system file");
        }
    })
}

function deleteCollections(db, collections) {
    return new Promise((resolve, reject) => {
        collections.map((collection) => {
            deleteCollection(db, collection.name)
            resolve()
        })
    })
}

async function start() {

    let db = await getDb('mongodb://user:pass@ds147544.mlab.com:47544/book')
    let collections = await getCollections(db)

    await deleteCollections(db, collections);
    let files = fs.readdirSync('./resources/')

    await createCollections(db, files)




    db.close();
}

start()