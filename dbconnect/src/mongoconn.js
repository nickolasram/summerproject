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

 export async function findAllInColl(collection, key, term) {
     let query = (term === '') ? {} : {[key]: term};
    return collection.find(query).toArray();
 }

 export async function executeCrudOperations(title,username) {
    const uri = process.env.DB_URI;
    let mongoClient;
    let classList = [];
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('classprep');
        let collection = db.collection('group1');
        let queryresult = await findAllInColl(collection, "title", title);
        for (let index = 0; index < queryresult.length; index++) {
            let element = queryresult[index];
            classList.push(element);
        }
        collection = db.collection('group2');
        let queryresult2 = await findAllInColl(collection, "username", username);
        let completedClasses = queryresult2[0]?.classes;
        return { allClasses: classList,
                 studentClasses: completedClasses
        };
    } finally {
        await mongoClient.close();
    }
 }

 export async function readStudents(username) {
    const uri = process.env.DB_URI;
    let mongoClient;
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('classprep');
        const collection = db.collection('group2');
        let queryresult = await findAllInColl(collection, "username", username);
        return queryresult[0];
    } finally {
        await mongoClient.close();
    }
}

export async function authenticate(pUsername, pPassword) {
    let {password} = await readStudents(pUsername);
    if (pPassword != password){
        return {
            status: "failure",
        };
    }
    else {
        return {
            status: "authenticated",
            username: pUsername
        };
    }
}

export async function pushClass(user, className) {
    const uri = process.env.DB_URI;
    let mongoClient;
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('classprep');
        const collection = db.collection('group2');
        await collection.updateOne(
            {username: user},
            { $addToSet: { classes: className} }
        );
        return "success";
    } finally {
        await mongoClient.close();
    }
}

export async function pullClass(user, className) {
    const uri = process.env.DB_URI;
    let mongoClient;
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('classprep');
        const collection = db.collection('group2');
        await collection.updateOne(
            {username: user},
            { $pull: { classes: className} }
        );
        return "success";
    } finally {
        await mongoClient.close();
    }
}