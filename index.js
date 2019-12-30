const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const config = require('./client/src/config');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlEncodedParser = bodyParser.urlencoded({extended: true});

const app = express();
app.use(urlEncodedParser);
app.use(jsonParser);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/public')));

// An api endpoint that returns a short list of items
app.get('/api/portfolios', (req,res) => {
    let portfolios = [];
    const client = new MongoClient(config.mongodb_uri, { useUnifiedTopology: true, useNewUrlParser: true });
    // const query = { "_id": id };
    // const update = { "$inc": { "views": 1 } };
    // const options = { "upsert": false };
    client.connect(err => {
        client.db("profile_db").collection("portfolios").find({}).toArray((err, docs)=>{
            portfolios = docs;
            res.json(portfolios);
        });
      });
      client.close();
      return res;
});

function iterateFunc(doc) {
    console.log(JSON.stringify(doc, null, 4));
 }
 
 function errorFunc(error) {
    console.log(error);
 }

app.get('/api/portfolio/:id', (req,res) => {
    const {id} = req.params;
    console.log("Id: " + id);
    // const client = new MongoClient(config.mongodb_uri, { useUnifiedTopology: true, useNewUrlParser: true });
    const query = {title: id};
    console.log('Query: ' + JSON.stringify(query));
    
    MongoClient.connect(config.mongodb_uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if(err) throw err;
        const db = client.db("profile_db");
        let portfolio = db.collection("portfolios").findOne(query, (err, result) => {
            if(err) throw err;
            console.log(result.title);
            res.json(result);
            client.close();
        });
      });
      
      return res;
});

app.put('/api/clicked', urlEncodedParser, (req,res) => {
    const { title } = req.body;
    
    const query = { "title": title };
    const update = { "$inc": { clicks: 1 } };
    MongoClient.connect(config.mongodb_uri, { useUnifiedTopology: true, useNewUrlParser: true }, (err, dbClient) => {
        if(err) throw err;
        const db = dbClient.db("profile_db");
        db.collection("portfolios").updateOne(query, update, (err, result)=>{
            if(err) throw err;
            res.json(result);
            dbClient.close();
        })
    });

    return res;
});


app.put('/api/viewed', (req,res) => {
    const { title } = req.body;
    
    const query = { "title": title };
    const update = { "$inc": { views: 1 } };
    MongoClient.connect(config.mongodb_uri, { useUnifiedTopology: true, useNewUrlParser: true }, (err, dbClient) => {
        if(err) throw err;
        const db = dbClient.db("profile_db");
        db.collection("portfolios").updateOne(query, update, (err, result)=>{
            if(err) throw err;
            res.json(result);
            dbClient.close();
        })
    });

    return res;
});

app.post('/api/contact', (req, res) => {
    // console.log(req.body);
    // res.status(200).send("Test passed.");

    MongoClient.connect(config.mongodb_uri, { useUnifiedTopology: true, useNewUrlParser: true }, (err, dbClient) => {
        if(err) throw err;
        const db = dbClient.db("contacts_db");
        try{
            db.collection("contacts").insertOne(req.body);
            res.send("Successfully saved the contact.");
        }
        catch(err){
            console.error("Something went wrong! : " + err);
            res.status(400).send("Something went terribly wrong, couldn't saved the contact.");
        }
        
    });
    return res;
})

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/public/index.html'));
    return res;
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('App is listening on port ' + port);
});


