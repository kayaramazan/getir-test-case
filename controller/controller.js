'use strict';
const mongoose = require('mongoose');
const Records = require('../model/record')

// define connection string
const mongoURI = 'mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true';

// Connect to mongodb with mongoose module
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

// It will make group data by id and date
const getRecordsByFilterGroupBy = async (startDate, endDate, minCount, maxCount) =>
new Promise((resolve, reject) => {
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
                key: "$key", createdAt: "$createdAt", _id: "$key", totalCount: {
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
        },
        {
            $group : {
               _id :  { _id:"$key",key:"$key", createdAt:"$createdAt"},
               totalCount : {$sum: "$totalCount"},
               
            }
        },
        {
            $project: {
                key: "$_id.key",
                createdAt: "$_id.createdAt", 
                _id: "$_id.key", 
                totalCount: "$totalCount"
            }
        }
         
    ], function (err, docs) {
        if (err) {
            // if something goes wrong return reject case
            reject(err);
        }
        else {
            // if everyting seems right return resolve case
            resolve(docs);
        }
    });

})


// Filter all records by parameters
const getRecordsByFilter = async (startDate, endDate, minCount, maxCount) =>
    new Promise((resolve, reject) => {
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
                reject(err);
            }
            else {
                // if everyting seems right return resolve case
                resolve(docs);
            }
        });

    })


// Check if Date params is valid
const checkDateParams = (req, res, next) => {
    let { startDate, endDate } = req.body;

    // Date format regex
    let regexDate = new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}$');
    if (!(regexDate.test(startDate) && regexDate.test(endDate)))
        res.status(300).send({ code: 3, msg: 'Something went wrong. Check Date Format It should be (YYYY-MM-DD) !!' });
    else
        next()


}
// Check if Count params is valid 
const checkCountParams = (req, res, next) => {

    let {minCount, maxCount } = req.body; 
    
    // Number format regex
    let regexNumber = new RegExp('^[0-9]*$');

    if (!(regexNumber.test(minCount) && regexNumber.test(maxCount) && maxCount > minCount))
        res.status(300).send({ code: 2, msg: 'Something went wrong. Check min and max numbers !!' });
    else
        next()
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

const getRecordsByGroup = async (req, res, next) => {

    let { startDate, endDate, minCount, maxCount } = req.body;

    getRecordsByFilterGroupBy(startDate, endDate, parseInt(minCount), parseInt(maxCount))
        .then(result => {
            res.status(200).send({ code: 0, msg: 'Success', records: result });
        })
        .catch(err => {
            res.status(300).send({ code: 1, msg: 'Something went wrong.' });
        })

}
module.exports.getRecordsByGroup = getRecordsByGroup;
module.exports.checkDateParams = checkDateParams;
module.exports.checkCountParams = checkCountParams;
module.exports.getRecords = getRecords;
module.exports.getRecordsByFilter = getRecordsByFilter;
