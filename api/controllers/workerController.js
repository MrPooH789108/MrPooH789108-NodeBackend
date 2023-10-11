// Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js
// It manages relationships between data, provides schema validation, 
// and is used to translate between objects in code and the representation of those objects in MongoDB.
const mongoose = require('mongoose');
// Mongoose model provides an interface to the database 
// for creating, querying, updating, deleting records, etc.
const worker = mongoose.model('workerlist');


exports.list_all_workers = (req, res) => {
  worker.find({}, (err, workers) => {
    if (err) res.send(err);
    res.json(workers);
  });
};
exports.create_a_worker = (req, res) => {
  const newworker = new worker(req.body);
  newworker.save((err, worker) => {
    if (err) res.send(err);
    res.json(worker);
  });
};
exports.read_a_worker = (req, res) => {
  worker.findById(req.params.workerId, (err, worker) => {
    if (err) res.send(err);
    res.json(worker);
  });
};
exports.update_a_worker = (req, res) => {
  worker.findOneAndUpdate(
    { _id: req.params.workerId },
    req.body,
    { new: true },
    (err, worker) => {
      if (err) res.send(err);
      res.json(worker);
    }
  );
};
exports.delete_a_worker = (req, res) => {
  worker.deleteOne({ _id: req.params.workerId }, err => {
    if (err) res.send(err);
    res.json({
      message: 'worker successfully deleted',
     _id: req.params.workerId
    });
  });
};


