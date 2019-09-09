const classFilterFunction = require('../util/classFilter');
const seatFilterFunction = require('../util/seatFilter');
const dateFilterFunction = require('../util/dateFilter');
const departureLocationFunction = require('../util/departureLocationFilter');
const destinationLocationFunction = require('../util/destinationLocationFilter');

module.exports = { // this will contain every filter function
    classFilter: classFilterFunction.classFilter, // get class filter
    seatFilter: seatFilterFunction.seatFilter, // get seat filter
    departureDateFilter: dateFilterFunction.dateFilter('departure_date'), // get departure date filter
    arrivalDateFilter: dateFilterFunction.dateFilter('arrival_date'), // get arrival date filter
    departureLocationFilter: departureLocationFunction.departureLocationFilter, // get departure location filter
    destinationLocationFilter: destinationLocationFunction.destinationLocationFilter // get destination location filter
};