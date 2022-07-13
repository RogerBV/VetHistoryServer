var URL = 'mongodb://rbgc:yucarellena28@ac-xfbpcbb-shard-00-00.vfvegd8.mongodb.net:27017,ac-xfbpcbb-shard-00-01.vfvegd8.mongodb.net:27017,ac-xfbpcbb-shard-00-02.vfvegd8.mongodb.net:27017/?ssl=true&replicaSet=atlas-rea8lj-shard-0&authSource=admin&retryWrites=true&w=majority'

async function getPets(){
    var MongoClient = require('mongodb').MongoClient;
    const client = await MongoClient.connect(URL, { useNewUrlParser: true })
        .catch(err => { console.log(err); });
    if (!client) {
        return;
    }

    try {

        const db = client.db("dbVetHistory");

        let collection = db.collection('pet');

        let query = { name: 'Volkswagen' }

        let res = await collection.find();
        console.log("RESPUESTA")
        return res

    } catch (err) {

        console.log(err);
    } finally {

        client.close();
    }
}


async function locoIvan(){
    var MongoClient = require('mongodb').MongoClient;
    var uri = "mongodb://rbgc:yucarellena28@ac-xfbpcbb-shard-00-00.vfvegd8.mongodb.net:27017,ac-xfbpcbb-shard-00-01.vfvegd8.mongodb.net:27017,ac-xfbpcbb-shard-00-02.vfvegd8.mongodb.net:27017/?ssl=true&replicaSet=atlas-rea8lj-shard-0&authSource=admin&retryWrites=true&w=majority";
    MongoClient.connect(uri, async function(err, client) {
        if (err) throw err;
        //console.log(client.db("dbVetHistory").collection("pet").find({}).toArray())
        //const collection = client.db("dbVetHistory").collection("pet");
        //perform actions on the collection object
        var cursor = client.db("dbVetHistory").collection("pet").find({})
        
        while (await cursor.hasNext()) {
            console.log(cursor.next())
          }
          return cursor;
        setTimeout(() => {client.close()}, 1500)
    });
}

module.exports = {
    locoIvan: locoIvan,
    getPets: getPets
}