const should = require('chai').should();
const db = require('../../app/config/db.config.prod');

const destinationLocationFilter = require('../../app/util/destinationLocationFilter').destinationLocationFilter;

describe('destination location filter file', () => {
    describe('filtering function', () => {
        it('should return a string to match tickets departing from "FSE"', (done) => {
            let filterObj = destinationLocationFilter('FSE', db);
            filterObj.should.equal(` AND destination IN ('FSE')`);
            done();
        });

        it('should return a string to match tickets departing from "FSE" or "CAR"', (done) => {
            let filterObj = destinationLocationFilter('FSE,CAR', db);
            filterObj.should.equal(` AND destination IN ('FSE','CAR')`);
            done();
        });

        it('should return a string to match tickets departing from Nothing', (done) => {
            let filterObj = destinationLocationFilter('Nothing', db);
            filterObj.should.equal(` AND destination IN ('Nothing')`);
            done();
        });
    });
});