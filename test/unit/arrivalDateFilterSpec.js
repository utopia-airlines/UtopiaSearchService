const should = require('chai').should();
const db = require('../../dao/db');

const arrivalDateFunction = require('../../util/arrivalDateFilter').arrivalDateFilter;

describe('arrival date filter file', () => {
    describe('filtering function', () => {
        it('should return a string that will filter out tickets with an arrival date between 2038-01-16 00:00:00 and 2038-01-21 00:00:00', (done) => {
            let filterObj = arrivalDateFunction('2038-01-16 00:00:00', '2038-01-21 00:00:00', db);
            filterObj.should.equal(' AND arrival_date BETWEEN \'2038-01-16 00:00:00\' AND \'2038-01-21 00:00:00\'');
            done();
        });

        it('should return a string that will filter out tickets with an arrival date between 0000-00-00 00:00:00 and 2038-01-16 00:00:00', (done) => {
            let filterObj = arrivalDateFunction(null, '2038-01-16 00:00:00', db);
            filterObj.should.equal(' AND arrival_date BETWEEN \'0000-00-00 00:00:00\' AND \'2038-01-16 00:00:00\'');
            done();
        });

        it('should return a string that will filter out tickets with arrival date between 2038-01-16 00:00:00 and 9999-12-31 23:59:59', (done) => {
            let filterObj = arrivalDateFunction('2038-01-16 00:00:00', null, db);
            filterObj.should.equal(' AND arrival_date BETWEEN \'2038-01-16 00:00:00\' AND \'9999-12-31 23:59:59\'');
            done();
        });
    });
});