// custom modules
const db = require('../../dao/db');
let server = require('../../index');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
const sqliteDatabase = require('better-sqlite3');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('All', () => {
    before((done) => {
        // for debugging add `verbose: console.log` to the object being passed in eg. {verbose: console.log, memory: true} (also look at the README)
        const Testdb = new sqliteDatabase('airlinesTest.db', {memory: true});
        Testdb.prepare('CREATE TABLE `tbl_airports` (`code` char(3) NOT NULL,`name` varchar(45) NOT NULL,PRIMARY KEY (`code`),UNIQUE (`code`));').run();

        Testdb.prepare('CREATE TABLE `tbl_flights` (`id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`departure` char(3) NOT NULL,`destination` char(3) NOT NULL,`departure_date` TEXT NOT NULL,`arrival_date` TEXT NOT NULL,`flight_number` int(11) NOT NULL,UNIQUE (`id`), FOREIGN KEY (`departure`) REFERENCES `tbl_airports` (`code`), FOREIGN KEY (`destination`) REFERENCES `tbl_airports` (`code`),CONSTRAINT `departure!=destination` CHECK (`departure` != `destination`),CONSTRAINT `departure_date<destination_date` CHECK (`departure_date` < `arrival_date`));').run();
        // create index for `destination` for tbl_flights
        Testdb.prepare('CREATE UNIQUE INDEX destination_idx ON tbl_flights (destination);').run();
        // create index for `departure` for tbl_flights
        Testdb.prepare('CREATE UNIQUE INDEX departure_idx ON tbl_flights (departure);').run();

        Testdb.prepare('CREATE TABLE `tbl_users` (`id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`username` varchar(45),`password` varchar(255),`display_name` varchar(45) DEFAULT NULL,`role` int(11) NOT NULL,`email` varchar(45),`phone` varchar(15),UNIQUE (`id`),CONSTRAINT `identifier_exists` CHECK ((`username` IS NOT NULL) OR (`email` IS NOT NULL) OR (`phone` IS NOT NULL)));').run();

        Testdb.prepare('CREATE TABLE `tbl_tickets` (`flight` int(11) NOT NULL,`seat_row` int(11) NOT NULL,`seat` char(1) NOT NULL,`class` int(11) NOT NULL,`reserver` int(11) DEFAULT NULL,`price` int(11) DEFAULT NULL,`reservation_timeout` datetime DEFAULT NULL,`booking_id` VARCHAR(45) DEFAULT NULL,PRIMARY KEY (`flight`,`seat_row`,`seat`),CONSTRAINT `flight` FOREIGN KEY (`flight`) REFERENCES `tbl_flights` (`id`),CONSTRAINT `reserver` FOREIGN KEY (`reserver`) REFERENCES `tbl_users` (`id`),CONSTRAINT `reserved_check` CHECK ( (`reserver` IS NULL AND `price` IS NULL AND `reservation_timeout` IS NULL)OR (`reserver` IS NOT NULL AND `price` IS NOT NULL AND `reservation_timeout` IS NULL)OR (`reserver` IS NOT NULL AND `price` IS NULL AND `reservation_timeout` IS NOT NULL) ),CONSTRAINT `booking_id_check` CHECK ((`reserver` IS NULL AND `booking_id` IS NULL) OR (`reserver` IS NOT NULL AND `booking_id` IS NOT NULL)));').run();
        // create index for `reserver` for tbl_tickets
        Testdb.prepare('CREATE UNIQUE INDEX reserver_idx ON tbl_tickets (reserver);').run();

        Testdb.prepare('INSERT INTO `tbl_users` (`username`, `role`) VALUES ("user", "1");').run();

        Testdb.prepare('INSERT INTO `tbl_airports` (`code`, `name`) VALUES ("DSA", "test"),("FSE", "test2");').run();

        Testdb.prepare('INSERT INTO `tbl_flights` (`departure`, `destination`, `departure_date`, `arrival_date`, `flight_number`) VALUES ("DSA", "FSE", "2038-01-19 03:14:07", "2038-01-20 03:14:07", "154681");').run();

        // one ticket that has been reserved
        Testdb.prepare('INSERT INTO `tbl_tickets` (`flight`, `seat_row`, `seat`, `class`, `reserver`, `price`, `booking_id`) VALUES ("1", "1", "A", "1", "1", "123", "fjsl35h");').run();
        Testdb.prepare('INSERT INTO `tbl_tickets` (`flight`, `seat_row`, `seat`, `class`) VALUES ("1", "2", "A", "1"),("1", "2", "B", "1"),("1", "2", "C", "1"),("1", "8", "A", "2"),("1", "8", "B", "2"),("1", "13", "A", "3"),("1", "13", "B", "3"),("1", "16", "A", "3");').run();

        // function indecating that this is function has finished
        done();
    });
    // beforeEach((done) => {
        //Before each test we empty the database
        // let sqlQuery = 'DELETE FROM employees;';
        // filter out reserver by default because we want tickets that have not been taken yet
        // db.query(sqlQuery,cb);
    // });
/*
  * Test the /GET route
  */
    describe('/GET all with query optional query parameters', () => {
        it('should GET all tickets that are not reserved', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    // console.log(res);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(8);
                done();
            });
        });

        it('should GET a list of first class tickets', (done) => {
            chai.request(server)
                .get('/')
                .query({class: '1'}) // /search?class=1
                .end((err, res) => {
                    // console.log(res);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(3);
                done();
            });
        });

        it('should GET nothing because the input is incorrect (TODO: change this so it returns 400 for bad request', (done) => {
            chai.request(server)
                .get('/')
                .query({class: 'j'}) // /search?class=1
                .end((err, res) => {
                    // console.log(res);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                done();
            });
        });
    });
});