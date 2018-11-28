// call the packages we need
var express    = require('express')      // call express
var bodyParser = require('body-parser')
var app        = express()     // define our app using express
const MongoClient = require('mongodb').MongoClient
const assert = require('assert');

// configure app to use bodyParser() and ejs
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');

// get an instance of the express Router
var router = express.Router();

// a “get” at the root of our web app: http://localhost:3000/api
router.get('/', function(req, res) {
  db.collection('dogs').find({}).toArray((err, result) => {
    if(err) {console.log(err)}
    res.render('index2.ejs', {dogs: result})
  })
});

router.post('/items', function(req, res) {
  console.log("POST!");  //logs to terminal
  var name = req.body.name
  var breed = req.body.breed
  db.collection('dogs').find({}).toArray((err, result) => {
    if(err) {console.log(err)}
    var id = result.length;
    db.collection('dogs').insertOne({name:name, breed:breed, id:id})
    res.redirect('/api'); 
  })

   //renders index page in browser
});

router.post('/delete', function(req, res){
  console.log("DELETE!");
  var id = parseInt(req.body.id);
  db.collection('dogs').deleteOne({id: id})
  res.redirect('/api');
})
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
//==========================================================
var db
MongoClient.connect('mongodb://Harrison27:Harrison1266502@ds155203.mlab.com:55203/dogsapp',{ useNewUrlParser: true }, (err, client) => {
    if(err) console.log(err)
    console.log("Connected successfully to server");

    db = client.db('dogsapp');
    app.listen(3000, () => {
        console.log('meow')
    })
})
