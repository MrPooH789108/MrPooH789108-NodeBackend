const express = require('express');
const morgan = require('morgan')
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
global.worker = require('./api/models/Model');
const  Routes = require('./api/routes/Routes');

mongoose.connect(
  //'mongodb://lazada:BgsMongo!123@dds-d9jd54d476fae4941101-pub.mongodb.ap-southeast-5.rds.aliyuncs.com:3717/InnoflexApp',
  'mongodb://192.168.1.211/registerFace' ,
  { useNewUrlParser: true }
);
const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.json());
app.use(morgan("dev"));

Routes(app);
app.listen(port);



app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

console.log(`Server started on port ${port}`);