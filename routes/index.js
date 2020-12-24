var express = require('express');
var router = express.Router();

var mongoose = require('mongoose'); 

const mongoConnect = async () =>{
  let result = await mongoose.connect('mongodb://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true', {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
  }) 
  return result;
}
/* GET home page. */
router.get('/', async function(req, res, next) {
  let resp = await mongoConnect
  res.send(resp);
});

module.exports = router;
