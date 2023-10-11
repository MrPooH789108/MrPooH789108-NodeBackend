//const express = require("express");
//const router = express.Router();
const auth = require("../../config/auth");
//const workerBuilder = require('../controllers/workerController');
const userBuilder = require('../controllers/userController');
const cardBuilder = require('../controllers/cardController');
const ossBuilder = require('../controllers/ossController');
const mqttBuilder = require('../controllers/mqttController');



//const upladBuilder = require('../controllers/uploadController');
module.exports = app => {
  //create worker routes
/*  app
    .route('/workers')
    .get(workerBuilder.list_all_workers)
    .post(workerBuilder.create_a_worker);
  app
    .route('/workers/:workerId')
    .get(workerBuilder.read_a_worker)
    .put(workerBuilder.update_a_worker)
    .delete(workerBuilder.delete_a_worker); */

  //USER API PATH
  app.post("/register", userBuilder.registerNewUser);
  app.post("/login", userBuilder.loginUser);
  app.get("/me", auth, userBuilder.getUserDetails);

  //CARD API PATH
  app
  .route('/card')
  .post(cardBuilder.registerNewCard)
  .get(cardBuilder.getcardDetails)
  app
  .route('/history')
  .post(cardBuilder.historyCard)
  .get(cardBuilder.gethistoryDetails);
  app
  .route('/card/:cardnumber')
  .get(cardBuilder.getcard)
  .put(cardBuilder.updatecard)
  .delete(cardBuilder.deletecard);
 //OSS API PATH
  app.post("/sts" , ossBuilder.getststoken);
  app.post("/check" , ossBuilder.get);
  app.post("/signature" , ossBuilder.signature)

//MQTT API PATH
  app
  .route('/mqtt')
  .post(mqttBuilder.publish)
  app.post("/delete" , mqttBuilder.delete);
};



