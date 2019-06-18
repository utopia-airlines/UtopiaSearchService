const should = require('chai').should();
const db = require('../../config/db.config.prod');

const seatFilter = require('../../util/seatFilter').seatFilter;

describe('seat filter file', () => {
    describe('filtering function', () => {
        it('should return a string that will filter out tickets with seat "A"', (done) => {
            let filterObj = seatFilter('A', db);
            filterObj.should.equal(' AND seat IN (\'A\')');
            done();
        });

        it('should return a string that will filter out tickets with seat "A" or "B"', (done) => {
            let filterObj = seatFilter('A,B', db);
            filterObj.should.equal(' AND seat IN (\'A\',\'B\')');
            done();
        });

        it('should return a string that will filter out tickets with seat "Nothing"', (done) => {
            let filterObj = seatFilter('Nothing', db);
            filterObj.should.equal(' AND seat IN (\'Nothing\')');
            done();
        });
    });
});