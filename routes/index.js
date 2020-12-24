var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const mongoURI = 'mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true';

// notice the mongoose.createConnection instead of mongoose.connect
mongoose.connect(mongoURI, { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true
}); 
const Records = mongoose.model('records', { }); 
const getRecordsByFilter = (startedDate,endingDate,minLimit,maxLimit) =>{
  Records.aggregate([
    {
        $match: {
            createdAt: {
                $gte: new Date(startedDate), $lt: new Date(endingDate)
            }
        }
    }, 
    {
        $project: {
            key:"$key",
            createdAt:"$createdAt",
            _id: "$key", 
            total: {
                $sum: "$counts"
            }
        }
    } ,
    {
        $match: {
            total: {
                $gte: minLimit, $lt: maxLimit
            }
        }
    }
  ], function (err, docs) { 
    if (err){ 
        console.log(err); 
    } 
    else{  
        console.log("Count : ", docs.length); 
    } 
  }); 
}
 
/* GET home page. */
router.get('/', async function (req, res, next) { 

 getRecordsByFilter("2016-01-26","2018-02-02",0,20000)
  
  res.send('succes');
});

module.exports = router;
