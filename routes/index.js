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

router.param('item', function(req, res, next, id) {
  console.log("in Param");
  var query = ToDo.findById(id);
  query.exec(function(err, item) {
    if(err) {return next(err);}
    if(!item) {return next(new Error("No item"));}
    req.item = item;
    return next();
  });
});

router.get('/todo/:item', function(req, res) {
  console.log("here in weird get");
  res.json(req.item);
});

router.put('/todo/:item/uppriority', function(req, res, next) {
  console.log("UP");
  req.item.uppriority(function(err, item) { 
    if(err) {return next(err);}
    res.json(item);
  });
});

router.put('/todo/:item/downpriority', function(req, res, next) {
  console.log("in Down");
  req.item.downpriority(function(err, item) {
    if(err) {return next(err);}
    res.json(item);
  });
});

router.delete('/todo/:item', function(req, res) {
  console.log("in Delete");
  req.item.remove();
  res.json(req.item);
});

module.exports = router;
