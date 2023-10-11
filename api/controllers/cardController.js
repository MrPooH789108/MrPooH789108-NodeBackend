const mongoose = require('mongoose');
const Card = mongoose.model('cardlist');
const History = mongoose.model('cardhistory');



exports.registerNewCard = async (req, res) => {
  try {
    let facility = req.body.facility;
    let CardUse = await Card.find({ cardnumber: req.body.cardnumber });
    console.log(CardUse);
    if (CardUse.length >= 1) {
      return res.status(409).json({
        message: "This card is already in use, Please try another card."
      });
    }
    const card = new Card({
      fullname: req.body.fullname,
      nickname: req.body.nickname,
      gender: req.body.gender,
      facility: facility,
      objective: req.body.objective,
      number: req.body.number,
      cardnumber: req.body.cardnumber,
      IDCardnumber: req.body.IDCardnumber,
      startdate: req.body.startdate,
      enddate: req.body.enddate,
      createby: req.body.createby
    });
    let data = await card.save();
    res.status(201).json({ data });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};


exports.getcardDetails = (req, res) => {
  Card.find({}, (err, data) => {
    if (err) res.send(err);
    res.json(data);
  });
};

exports.historyCard = async (req, res) => {
  try {
    let facility = req.body.facility;
    const card = new History({
      fullname: req.body.fullname,
      nickname: req.body.nickname,
      gender: req.body.gender,
      facility: facility,
      objective: req.body.objective,
      number: req.body.number,
      cardnumber: req.body.cardnumber,
      IDCardnumber: req.body.IDCardnumber,
      startdate: req.body.startdate,
      enddate: req.body.enddate,
      returndate: req.body.returndate,
      createby: req.body.createby
    });
    let data = await card.save();
    res.status(201).json({ data });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};


exports.gethistoryDetails = (req, res) => {
    History.find({}, (err, data) => {
    if (err) res.send(err);
    res.json(data);
  });
};

exports.getcard = (req, res) => {
  Card.findById(req.params.cardnumber, (err, data) => {
    if (err) res.send(err);
    res.json(data);
  });
};

exports.updatecard = (req, res) => {
  Card.findOneAndUpdate(
    { _id: req.params.cardnumber },
    req.body,
    { new: true },
    (err, data) => {
      if (err) res.send(err);
      res.json(data);
    }
  );
};
exports.deletecard = (req, res) => {
  Card.deleteOne({ _id: req.params.cardnumber }, err => {
    if (err) res.send(err);
    res.json({
      message: 'card successfully deleted',
     _id: req.params.cardnumber
    });
  });
};

