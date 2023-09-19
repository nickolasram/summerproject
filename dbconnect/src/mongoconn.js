import { MongoClient } from 'mongodb';

export async function connectToCluster(uri) {
    let mongoClient;
    try {
        mongoClient = new MongoClient(uri);
        await mongoClient.connect();
        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        process.exit();
    }
 }

 export async function findAllInColl(collection, classTitle) {
     let query = (classTitle === '') ? {} : {title: classTitle};
    return collection.find(query).toArray();
 }

 export async function executeCrudOperations(title) {
    const uri = process.env.DB_URI;
    let mongoClient;
    let classList = [];
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('classprep');
        const collection = db.collection('group1');
        let queryresult = await findAllInColl(collection, title);
        for (let index = 0; index < queryresult.length; index++) {
            let element = queryresult[index];
            classList.push(element);
        }
        return classList;
    } finally {
        await mongoClient.close();
    }
 }