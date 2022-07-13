const { MongoClient } = require('mongodb');
async function connect(){
    try{
        const client = await MongoClient.connect('mongodb://rbgc:yucarellena28@ac-xfbpcbb-shard-00-00.vfvegd8.mongodb.net:27017,ac-xfbpcbb-shard-00-01.vfvegd8.mongodb.net:27017,ac-xfbpcbb-shard-00-02.vfvegd8.mongodb.net:27017/?ssl=true&replicaSet=atlas-rea8lj-shard-0&authSource=admin&retryWrites=true&w=majority')
        const db = client.db('dbVetHistory');
        return db;
    }catch(e){
        console.log(e)
    }
    
}

module.exports = {
    connect:connect
}