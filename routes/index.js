var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/your-app-name');

const mongoConnect = async () =>{
  let result = await mongoose.connect('mongodb://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true', {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
  }) 
  return result;
}
/* GET home page. */
router.get('/', async function(req, res, next) {
  let res = await mongoConnect
  res.send(res);
});

module.exports = router;
