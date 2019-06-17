const should = require('chai').should();
const db = require('../../dao/db');

const departureLocationFilter = require('../../util/departureLocationFilter').departureLocationFilter;

describe('departure location filter file', () => {
    describe('filtering function', () => {
        it('should return a string that will filter out tickets with a "TWS" departure location', (done) => {
            let filterObj = departureLocationFilter('TWS', db);
            filterObj.should.equal(' AND departure IN (\'TWS\')');
            done();
        });

        it('should return a string that will filter out tickets departuring from "TWS" or "DSA"', (done) => {
            let filterObj = departureLocationFilter('TWS,DSA', db);
            filterObj.should.equal(' AND departure IN (\'TWS\',\'DSA\')');
            done();
        });

        it('should return a string that will filter out tickets departuring from Nothing', (done) => {
            let filterObj = departureLocationFilter('Nothing', db);
            filterObj.should.equal(' AND departure IN (\'Nothing\')');
            done();
        });
    });
});