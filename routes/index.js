var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const Records = mongoose.model('records', {});


const getRecordsByFilter = async (startDate, endDate, minCount, maxCount) =>
    new Promise((res, rej) => {
        Records.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(startDate), $lt: new Date(endDate)
                    }
                }
            },
            {
                $project: {
                    key: "$key",
                    createdAt: "$createdAt",
                    _id: "$key",
                    totalCount: {
                        $sum: "$counts"
                    }
                }
            },
            {
                $match: {
                    totalCount: {
                        $gte: minCount, $lt: maxCount
                    }
                }
            }
        ], function (err, docs) {
            if (err) {
                rej(err);
            }
            else {
                res(docs);
            }
        });

    })

const checkParams = (req, res, next) => {
    let { startDate, endDate, minCount, maxCount } = req.body;
    let regexDate = new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}$');
    let regexNumber = new RegExp('^[0-9]*$');
    if (regexDate.test(startDate) && regexDate.test(endDate)) {
        if (regexNumber.test(minCount) && regexNumber.test(maxCount) && maxCount > minCount) {
            next();
        }
        else {
            res.status(300).send({ code: 1, msg: 'Something went wrong. Check min and max numbers !!' });
        }
    } else {
        res.status(300).send({ code: 1, msg: 'Something went wrong. Check Date Format It should be (YYYY-MM-DD) !!' });
    }

} 

router.get('/', function (req, res, next) {
    
    res.send({message:req.url})
});

router.post('/', checkParams, async function (req, res, next) {

    let { startDate, endDate, minCount, maxCount } = req.body;
    getRecordsByFilter(startDate, endDate, parseInt(minCount), parseInt(maxCount))
        .then(result => {
            res.status(200).send({ code: 0, msg: 'Success', records: result });
        })
        .catch(err => {
            res.status(300).send({ code: 1, msg: 'Something went wrong. Check your params !!' });
        })

})

module.exports = router;
