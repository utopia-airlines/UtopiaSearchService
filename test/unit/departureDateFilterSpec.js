const should = require('chai').should();
const db = require('../../app/config/db.config.prod');

const departureDateFilter = require('../../app/util/dateFilter').dateFilter('departure_date');

describe('departure date filter file', () => {
    describe('filtering function', () => {
        it('should return a string to match tickets arriving between 2038-01-11 and 2038-01-12', (done) => {
            let filterObj = departureDateFilter('2038-01-11 00:00:00', '2038-01-12 00:00:00', db);
            filterObj.should.equal(` AND departure_date BETWEEN '2038-01-11 00:00:00' AND '2038-01-12 00:00:00'`);
            done();
        });

        it('should return a string to match tickets arriving before 2038-01-12', (done) => {
            let filterObj = departureDateFilter(null, '2038-01-12 00:00:00', db);
            filterObj.should.equal(` AND departure_date BETWEEN '0000-00-00 00:00:00' AND '2038-01-12 00:00:00'`);
            done();
        });

        it('should return a string to match tickets arriving on or after 2038-01-11', (done) => {
            let filterObj = departureDateFilter('2038-01-11 00:00:00', null, db);
            filterObj.should.equal(` AND departure_date BETWEEN '2038-01-11 00:00:00' AND '9999-12-31 23:59:59'`);
            done();
        });
    });
});