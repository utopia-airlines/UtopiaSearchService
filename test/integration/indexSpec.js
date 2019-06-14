// custom modules
const db = require('../../dao/db');
let server = require('../../index');
const sqliteUtil = require('../../resource/SQLiteDB');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('All with queries', () => {
    before((done) => {
        sqliteUtil.createSQLiteDatabase(function() {
            // function indecating that this is function has finished
            done();
        });
    });
    /*
    * Test the /GET route with class filter
    */
    describe('/GET all with class query parameters', () => {
        it('should GET all tickets that are not reserved', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(16);
                done();
            });
        });

        it('should GET a list of first class tickets', (done) => {
            chai.request(server)
                .get('/')
                .query({class: '1'}) // /?class=1
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(6);
                done();
            });
        });

        it('should GET nothing because the input is incorrect (TODO: change this so it returns 400 for bad request', (done) => {
            chai.request(server)
                .get('/')
                .query({class: 'j'}) // /?class=1
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                done();
            });
        });
    });
    /*
    * Test the /GET route with seat filter
    */
    describe('/GET all with seat query parameters', () => {
        it('should GET a list of "A" seats tickets', (done) => {
            chai.request(server)
                .get('/')
                .query({seat: 'A'}) // /?seat=A
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(8);
                done();
            });
        });

        it('should GET a list of "A" and "B" seats tickets', (done) => {
            chai.request(server)
                .get('/')
                .query({seat: 'A,B'}) // /?seat=A,B
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(14);
                done();
            });
        });

        it('should GET nothing because the input is incorrect (TODO: change this so it returns 400 for bad request', (done) => {
            chai.request(server)
                .get('/')
                .query({seat: 'Nothing'}) // /?seat=Nothing
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                done();
            });
        });
    });
    /*
    * Test the /GET route with departure date filter
    */
    describe('/GET all with departure date query parameters', () => {
        it('should GET a list tickets with departure date between 2038-01-11 00:00:00 and 2038-01-12 00:00:00', (done) => {
            chai.request(server)
                .get('/')
                .query({departure_date_after: '2038-01-11 00:00:00',
                        departure_date_before: '2038-01-12 00:00:00'}) // /?departure_date_after=2038-01-11 00:00:00&departure_date_before=2038-01-12 00:00:00
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(2);
                done();
            });
        });

        it('should GET a list tickets with departure date between a non given datetime and 2038-01-12 00:00:00', (done) => {
            chai.request(server)
                .get('/')
                .query({departure_date_before: '2038-01-12 00:00:00'}) // /?departure_date_before=2038-01-12 00:00:00
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(8);
                done();
            });
        });

        it('should GET a list tickets with departure date between 2038-01-11 00:00:00 and a non given datetime', (done) => {
            chai.request(server)
                .get('/')
                .query({departure_date_after: '2038-01-11 00:00:00'}) // /?departure_date_after=2038-01-11 00:00:00
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(10);
                done();
            });
        });
    });
});