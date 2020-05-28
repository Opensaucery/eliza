if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
} 

const express = require ('express');
const bodyParser = require('body-parser')
const path = require('path');
const exphbs = require('express-handlebars')
const logger = require('./middleware/logger');
const MongoClient = require('mongodb').MongoClient
//const links = require('');
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology:true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

const app = express(); 

// Connect to Mongo database
const uri = 'mongodb+srv://eliza:3aJ0cgIH0nrAG5oU@testcluster1-jsvi3.gcp.mongodb.net/test?retryWrites=true&w=majority'
MongoClient.connect(uri, { useUnifiedTopology: true })
.then(client => {
    console.log('Connected to Mongo')
    const db = client.db('writingrefs')
    const reflinks = db.collection('links')
    
    // Handlebars Middleware
    app.engine('handlebars', exphbs());
    app.set('view engine', 'handlebars');
    
    // Body parser middleware
    app.use(express.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json())
    
    // Set static foler
    app.use(express.static(path.join(__dirname, 'public')));
    
    //Articles API Route
    //app.use('/api/articles', require('./routes/api/articles'));
   
    // Theatre Route
    app.get('/theatre', (req, res) => res.render('theatre', {
        title:'Theatre',
        
    }));
    
    //  Edit Route
    app.get('/edit', (req, res) => {
        db.collection('links').find().toArray(function (err, result){       
        res.render('edit', {
        title:'Edit',
        links: result
        })
    })});


    //app.use()
        app.post('/links', (req, res) => {
        reflinks.insertOne(req.body).then(result => {
            res.redirect('/edit')
        }).catch(error => console.error(error))
    })
    //app.listen()

    /*app.put('/links', (req, res) => {
       reflinks.findOneAndUpdate(
           { headLine: 'hello'},
           {
               $set: {
                   headLine: 'berg',
                   descrip: req.body.descrip
               }
           },
           {
           upsert: true
           }
       ) 
       .then(result => {
           res.json('Success')
       })
       .catch(error => console.error(error))
    })
    */

    app.put('/:_id', (req, res) => {
        res.send('Update Link ' + req.params.id)
    })

    app.delete('/:id', (req, res) => {
        res.send('Delete Author ' + req.params.id)
    })
            /*.then(result => {
                if (result.deletedCount === 0) {
                    return res.json('No quote to delete')
        }
        res.json('Deleted that record')
    })    
            .catch(error => console.error(error))
    })*/

})




//Init middleware
//app.use(logger);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));