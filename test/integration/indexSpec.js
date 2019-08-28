// custom modules
let server = require('../../index');
let stop = server.stop;
const sqliteUtil = require('../util/SQLiteDB');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('All with queries', () => {
    before(sqliteUtil.createSQLiteDatabase);
    after(stop);

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
        it('should GET a list of tickets departing between 2038-01-11 and 2038-01-12', (done) => {
            chai.request(server)
                .get('/')
                .query({departureDateAfter: '2038-01-11 00:00:00',
                        departureDateBefore: '2038-01-12 00:00:00'}) // /?departureDateAfter=2038-01-11 00:00:00&departureDateBefore=2038-01-12 00:00:00
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(2);
                done();
            });
        });

        it('should GET a list of tickets departing before 2038-01-12', (done) => {
            chai.request(server)
                .get('/')
                .query({departureDateBefore: '2038-01-12 00:00:00'}) // /?departureDateBefore=2038-01-12 00:00:00
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(8);
                done();
            });
        });

        it('should GET a list of tickets departing on or after 2038-01-11', (done) => {
            chai.request(server)
                .get('/')
                .query({departureDateAfter: '2038-01-11 00:00:00'}) // /?departureDateAfter=2038-01-11 00:00:00
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(10);
                done();
            });
        });
    });

    /*
    * Test the /GET route with arrival date filter
    */
    describe('/GET all with arrival date query parameters', () => {
        it('should GET a list of tickets arriving between 2038-01-16 and 2038-01-21', (done) => {
            chai.request(server)
                .get('/')
                .query({arrivalDateAfter: '2038-01-16 00:00:00',
                        arrivalDateBefore: '2038-01-21 00:00:00'}) // /?arrivalDateAfter=2038-01-16&arrivalDateBefore=2038-01-21
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(8);
                done();
            });
        });

        it('should GET a list of tickets arriving before 2038-01-16', (done) => {
            chai.request(server)
                .get('/')
                .query({arrivalDateBefore: '2038-01-16 00:00:00'}) // /?arrivalDateBefore=2038-01-16
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(8);
                done();
            });
        });

        it('should GET a list of tickets arriving on or after 2038-01-16', (done) => {
            chai.request(server)
                .get('/')
                .query({arrivalDateAfter: '2038-01-16 00:00:00'}) // /?arrivalDateAfter=2038-01-16
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(8);
                done();
            });
        });
    });

    /*
    * Test the /GET route with departure_location filter
    */
    describe('/GET all with departure_location query parameters', () => {
        it('should GET a list of tickets departing "TWS"', (done) => {
            chai.request(server)
                .get('/')
                .query({departure_location: 'TWS'}) // /?departure_location=TWS
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(6);
                done();
            });
        });

        it('should GET a list of tickets departing "TWS" and "DSA"', (done) => {
            chai.request(server)
                .get('/')
                .query({departure_location: 'TWS,DSA'}) // /?departure_location=TWS,DSA
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
                .query({departure_location: 'Nothing'}) // /?departure_location=Nothing
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                done();
            });
        });
    });

    /*
    * Test the /GET route with destination_location filter
    */
    describe('/GET all with destination_location query parameters', () => {
        it('should GET a list of tickets arriving at "FSE"', (done) => {
            chai.request(server)
                .get('/')
                .query({destination_location: 'FSE'}) // /?destination_location=FSE
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(8);
                done();
            });
        });

        it('should GET a list of tickets arriving at "FSE" and "CAR"', (done) => {
            chai.request(server)
                .get('/')
                .query({destination_location: 'FSE,CAR'}) // /?destination_location=FSE,CAR
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(10);
                done();
            });
        });

        it('should GET nothing because the input is incorrect (TODO: change this so it returns 400 for bad request', (done) => {
            chai.request(server)
                .get('/')
                .query({destination_location: 'Nothing'}) // /?destination_location=Nothing
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                done();
            });
        });
    });
});