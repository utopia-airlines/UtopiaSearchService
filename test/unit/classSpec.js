const should = require('chai').should();
const db = require('../../app/config/db.config.prod');

const classFilter = require('../../app/util/classFilter').classFilter;

describe('class filter file', () => {
    describe('filtering function', () => {
        it('should return a string to match tickets in first class', (done) => {
            let filterObj = classFilter('1', db);
            filterObj.should.equal(` AND class = '1'`);
            done();
        });

        it('should return a string to match tickets with class j', (done) => {
            let filterObj = classFilter('j', db);
            filterObj.should.equal(` AND class = 'j'`);
            done();
        });
    });
});