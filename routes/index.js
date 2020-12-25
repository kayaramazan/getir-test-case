const express = require('express');
const router = express.Router();
const controller = require('../controller/controller')

router.get('/', function (req, res, next) {
    res.status(200).send({ 
        code: 4,
        msg: `Please using post method : ${req.protocol}://${req.get('host')}${req.originalUrl}`,
        gitRepository:'https://github.com/kayaramazan/getir-test-case'
    })
});

router.post('/', controller.checkCountParams,controller.checkDateParams, controller.getRecords)

module.exports = router;
