const { STS } = require('ali-oss');
const OSS = require('ali-oss');



exports.getststoken = async (req, res) => {
    let sts = new STS({
     accessKeyId: req.body.accessKeyId, 
     accessKeySecret: req.body.accessKeySecret
   });
     sts.assumeRole('acs:ram::5715154141301966:role/ramosstest', '', 3600)
     .then((result) => {
       console.log(result);
       res.set('Access-Control-Allow-Origin', '*');
       res.set('Access-Control-Allow-METHOD', 'GET');
       res.json({
         AccessKeyId: result.credentials.AccessKeyId,
         AccessKeySecret: result.credentials.AccessKeySecret,
         SecurityToken: result.credentials.SecurityToken,
         Expiration: result.credentials.Expiration
       });
     }).catch((err) => {
       console.log(err);
       res.status(400).json(err.message);
     });
   };

exports.get = async (req, res) => {
    let client = new OSS({
     region: 'oss-ap-southeast-3',
     bucket: 'lazada-wfm',
     accessKeyId: req.body.accessKeyId, 
     accessKeySecret: req.body.accessKeySecret
   });
   console.log(client)
   async function get () {
    try {
      let result = await client.list({prefix: 'workers/'+req.body.workerID+'-'+req.body.workerName+'.jpg'}); 
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json(e);
    }
  } 
  get();  
   };

exports.signature = async (req, res) => {
    let client = new OSS({
     region: 'oss-ap-southeast-3',
     bucket: 'lazada-wfm',
     accessKeyId: req.body.accessKeyId, 
     accessKeySecret: req.body.accessKeySecret
   });
   async function geturl () {
    try {
      const url = client.signatureUrl('workers/'+req.body.workerID+'-'+req.body.workerName+'.jpg', 
      {
        process: 'image'
      });
      res.status(200).json(url);
    } catch (e) {
      res.status(400).json(e);
    }
  } 
  geturl();  
   };


   