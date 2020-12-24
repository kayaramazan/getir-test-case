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
const getRecordsByFilter = async (startedDate,endingDate,minLimit,maxLimit) =>{
 return new Promise((res,rej)=>{
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
        res(docs)
    } 
  }); 

 })
}
 
/* GET home page. */
router.get('/:sDate/:eDate/:min/:max', async function (req, res, next) { 
let {sDate, eDate, min,max} = req.params
console.log(req.params)
let response = await getRecordsByFilter(sDate,eDate,parseInt(min),parseInt(max))
 
  res.send(JSON.stringify(response));
});

module.exports = router;
