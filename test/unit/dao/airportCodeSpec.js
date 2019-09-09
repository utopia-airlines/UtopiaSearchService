const should = require('chai').should();
const sqliteUtil = require('../../util/SQLiteDB');

const airportDetailDao = require('../../../app/dao/airportDetailDao');

describe('airportDetailDao', () => {
    before(sqliteUtil.createSQLiteDatabase);

    describe('getting aiport details using a airport code', () => {
        it('it should return the details of an airport given CAR', (done) => {
            let filter = {airport: 'CAR'};
            airportDetailDao.get(filter, (err, result) => {
                result.length.should.equal(1);
                let firstEntry = result[0];
                firstEntry.code.should.equal('CAR');
                firstEntry.name.should.equal('test6');
                done();
            });
        });
    });

    describe('getting all airport details', () => {
        it('it should return details for all airports', (done) => {
            airportDetailDao.getAll((err, result) => {
                result.length.should.equal(6);
                done();
            });
        });
    });
});