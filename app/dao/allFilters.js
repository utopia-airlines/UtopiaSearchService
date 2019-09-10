const classFilterFunction = require('../util/classFilter');
const seatFilterFunction = require('../util/seatFilter');
const dateFilterFunction = require('../util/dateFilter');
const locationFilterFunction = require('../util/locationFilter');

module.exports = { // this will contain every filter function
    classFilter: classFilterFunction.classFilter, // get class filter
    seatFilter: seatFilterFunction.seatFilter, // get seat filter
    departureDateFilter: dateFilterFunction.dateFilter('departure_date'), // get departure date filter
    arrivalDateFilter: dateFilterFunction.dateFilter('arrival_date'), // get arrival date filter
    departureLocationFilter: locationFilterFunction.locationFilter('departure'), // get departure location filter
    destinationLocationFilter: locationFilterFunction.locationFilter('destination') // get destination location filter
};