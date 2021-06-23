//express
const express = require('express');
const cors = require('cors');
const app = express();
//database
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://shopKeeper:myShop123@cluster0.jwwii.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(uri,
    {
        useUnifiedTopology: true
    });

const dbName = 'myShop';
const shopItems = 'shopItems';
const shopCustomers='shopCustomers';

const port = process.env.PORT || 8000;
app.listen(port, () => { console.log(`Server starts on port ${port}`) });
app.use(express.json());
app.use(cors());

client.connect();

app.get('/', async (req,res,err) => {
    try {
        await getCollection(client, dbName, shopItems)
            .then(data => {
                res.send(data);
            })
            .catch(err => console.log(err))
        }
        catch{ console.log(err); }
});

app.post('/login', async (req, res,err) => {
    try {
        await getCustomer(client, dbName, shopCustomers, req.body)
            .then(data => {
                if (!!data) res.send(data)
                else res.send('User not found') 
            })
            .catch(err => console.log(err));
        }
    catch{console.log(err);}
});
app.post(['/order','/user'], async (req, res, err) => {
    try {
        await updateCustomer(client, dbName, shopCustomers, { id: req.body.id} , { $set: { orders:req.body.orders }  }, {upsert:false})
            .then(data => {
                if (!!data) res.send('Object updated');
                else res.send('Object not found');
            })
            .catch(err => console.log(err));
        }
    catch{console.log(err);}
});
async function getCustomer(dbClient,dbName,dbCollection,customer){
    try {   
        return dbClient.db(dbName).collection(dbCollection).findOne(customer);
        }
    catch (err){ console.error(err);}
}
async function updateCustomer(dbClient,dbName,dbCollection,filter,payload,options){
    try {
        return dbClient.db(dbName).collection(dbCollection).updateOne(filter,payload,options);
        }
    catch (err){ console.error(err);}
}
async function getCollection(dbClient,dbName,dbCollection){
    try {
        return dbClient.db(dbName).collection(dbCollection).find({}).toArray();
        }
    catch (err){ console.log(err);}
}