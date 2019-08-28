const should = require('chai').should();
const sqliteUtil = require('../../util/SQLiteDB');

const flightDetailDao = require('../../../app/dao/flightDetailDao');

describe('flightDetailDao', () => {
    before((done) => {
        sqliteUtil.createSQLiteDatabase(done);
    });

    describe('getting flight details using a flight number', () => {
        it('should return the details of flight number 154681', (done) => {
            let filter = {flight: 154681};
            flightDetailDao.get(filter, (err, result) => {
                result.length.should.equal(1);
                let firstEntry = result[0];
                firstEntry.departure.should.equal('DSA');
                firstEntry.destination.should.equal('FSE');
                firstEntry.departure_date.should.equal('2038-01-19 03:14:07');
                firstEntry.arrival_date.should.equal('2038-01-20 03:14:07');
                done();
            });
        });
    });

    describe('getting all flight details', () => {
        it('should return details for all flights', (done) => {
            flightDetailDao.getAll((err, result) => {
                result.length.should.equal(3);
                done();
            });
        });
    });
});