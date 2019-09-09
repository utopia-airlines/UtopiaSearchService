const should = require('chai').should();
const db = require('../../app/config/db.config.prod');

const departureLocationFilter = require('../../app/util/departureLocationFilter').departureLocationFilter;

describe('departure location filter file', () => {
    describe('filtering function', () => {
        it('should return a string to match tickets departing from "TWS"', (done) => {
            let filterObj = departureLocationFilter('TWS', db);
            filterObj.should.equal(` AND departure IN ('TWS')`);
            done();
        });

        it('should return a string to match tickets departuring from "TWS" or "DSA"', (done) => {
            let filterObj = departureLocationFilter('TWS,DSA', db);
            filterObj.should.equal(` AND departure IN ('TWS','DSA')`);
            done();
        });

        it('should return a string to match tickets departuring from Nothing', (done) => {
            let filterObj = departureLocationFilter('Nothing', db);
            filterObj.should.equal(' AND departure IN (\'Nothing\')');
            done();
        });
    });
});