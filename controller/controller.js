'use strict';
const mongoose = require('mongoose');

// define connection string
const mongoURI = 'mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true';

// Connect to mongodb with mongoose module
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

// Get 'records' collection from db
const Records = mongoose.model('records', {});



// Filter all records by parameters
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
                // if something goes wrong return reject case
                rej(err);
            }
            else {
                // if everyting seems right return resolve case
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
            res.status(300).send({ code: 2, msg: 'Something went wrong. Check min and max numbers !!' });
        }
    } else {
        res.status(300).send({ code: 3, msg: 'Something went wrong. Check Date Format It should be (YYYY-MM-DD) !!' });
    }

}

const getRecords = async (req, res, next) => {

    let { startDate, endDate, minCount, maxCount } = req.body;

    getRecordsByFilter(startDate, endDate, parseInt(minCount), parseInt(maxCount))
        .then(result => {
            res.status(200).send({ code: 0, msg: 'Success', records: result });
        })
        .catch(err => {
            res.status(300).send({ code: 1, msg: 'Something went wrong.' });
        })

}

module.exports.checkParams = checkParams;
module.exports.getRecords = getRecords;
module.exports.getRecordsByFilter = getRecordsByFilter;