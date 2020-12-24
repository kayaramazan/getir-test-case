var express = require('express');
var router = express.Router();
const controller = require('../controller/controller')

router.get('/', function (req, res, next) {
    res.status(200).send({ code: 4, msg: `Please using post method : ${req.protocol}://${req.get('host')}${req.originalUrl}` })
});

router.post('/', controller.checkParams, controller.getRecords)

module.exports = router;
