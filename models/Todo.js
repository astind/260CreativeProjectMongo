var mongoose = require('mongoose');
var ToDoSchema = new mongoose.Schema({
  owner: String,
  item: String,
  priority: {type: Number, default: 0},
});

ToDoSchema.methods.uppriority = function(cb) {
  this.priority += 1;
  this.save(cb);
};
ToDoSchema.methods.downpriority = function(cb) {
  this.priority -= 1;
  this.save(cb);
};

mongoose.model('ToDo', ToDoSchema);
