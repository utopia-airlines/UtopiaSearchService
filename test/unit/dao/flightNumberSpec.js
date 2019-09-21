const should = require('chai').should();
const sqliteUtil = require('../../util/SQLiteDB');

const flightDetailDao = require('../../../app/dao/flightDetailDao');

describe('flightDetailDao', () => {
    before(sqliteUtil.createSQLiteDatabase);

    describe('getting flight details using a flight number', () => {
        it('should return the details of flight number 154681', (done) => {
            let filter = {flight: 154681};
            flightDetailDao.get(filter, (err, result) => {
                result.length.should.equal(1);
                let firstEntry = result[0];
                firstEntry.departure.code.should.equal('DSA');
                firstEntry.departure.name.should.equal('test');
                firstEntry.destination.code.should.equal('FSE');
                firstEntry.destination.name.should.equal('test2');
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