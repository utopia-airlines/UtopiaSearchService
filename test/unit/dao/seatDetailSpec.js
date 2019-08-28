const should = require('chai').should();
const sqliteUtil = require('../../util/SQLiteDB');

const seatDetailDao = require('../../../app/dao/seatDetailDao');

describe('seatDetailDao', () => {
    before((done) => {
        sqliteUtil.createSQLiteDatabase(done);
    });

    describe('getting seat details using a flight number', () => {
        it('it should return a list of 9 seat details given 154681', (done) => {
            let filter = {flight: '154681'};
            seatDetailDao.get(filter, (err, result) => {
                result.length.should.equal(9);
                done();
            });
        });
    });
});