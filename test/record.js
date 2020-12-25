process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Book = require('../model/record');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);

describe('/GET index', () => {
    it('it should index with some message', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('msg');
                res.body.should.have.property('code');
                res.body.should.have.property('code').eql(4);
                done();
            });
    });
});
describe('/POST query', () => {
    it('it should return a all records by filter ', (done) => {
        let query = {
            startDate: "2016-01-26",
            endDate: "2018-02-02",
            minCount: 0,
            maxCount: 100
        }
        chai.request(server)
            .post('/')
            .send(query)
            .end((err, res) => {
                res.should.have.status(200); 
                res.body.should.have.property('code');
                res.body.should.have.property('msg');
                res.body.should.have.property('records');
                res.body.should.have.property('msg').eql('Success');
                res.body.should.have.property('code').eql(0); 
                res.body.should.be.a('object');
                res.body.records.should.be.a('array');
                done();
            });
    });

});
/*
* Test the /POST route
*/
describe('/POST wrong date format', () => {
    it('it should return a error  code and message', (done) => {
        let query = {
            startDate: "2016/01/26",
            endDate: "2018/01/02",
            minCount: 0,
            maxCount: 100
        }
        chai.request(server)
            .post('/')
            .send(query)
            .end((err, res) => {
                res.should.have.status(300);
                res.body.should.be.a('object');
                res.body.should.have.property('msg').eql('Something went wrong. Check Date Format It should be (YYYY-MM-DD) !!');
                res.body.should.have.property('code').eql(3); 
                done();
            });
    });
}); 

    describe('/POST wrong number format', () => {
        it('it should return a error  code and message', (done) => {
            let query = {
                startDate: "2016-01-26",
                endDate: "2018-02-02",
                minCount: 0,
                maxCount: 'hundred'
            }
            chai.request(server)
                .post('/')
                .send(query)
                .end((err, res) => {
                    res.should.have.status(300);
                    res.body.should.be.a('object');
                    res.body.should.have.property('msg').eql('Something went wrong. Check min and max numbers !!');
                    res.body.should.have.property('code').eql(2); 
                    done();
                });
        });
}); 
 
describe('/POST max should be bigger', () => {
    it('it should return a error  code and message ', (done) => {
        let query = {
            startDate: "2016-01-26",
            endDate: "2018-02-02",
            minCount: 200,
            maxCount: 100
        }
        chai.request(server)
            .post('/')
            .send(query)
            .end((err, res) => {
                res.should.have.status(300);
                res.body.should.be.a('object');
                res.body.should.have.property('msg').eql('Something went wrong. Check min and max numbers !!');
                res.body.should.have.property('code').eql(2); 
                done();
            });
    });
}); 