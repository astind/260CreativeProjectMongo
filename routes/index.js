var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var ToDo = mongoose.model('ToDo');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/todo', function(req, res, next) {
  console.log("in get todo");
  var query = req.query.u;
  ToDo.find({'owner': query}, function(err, docs) { 
    if(err){return next(err); }
    res.json(docs);
  });
});

router.post('/todo', function(req, res, next) {
  console.log("in post todo");
  console.log(req.body);
  var item = new ToDo(req.body);
  item.save(function(err, item) {
    if(err) {return next(err); }
    res.json(item);
  });
});

module.exports = router;
