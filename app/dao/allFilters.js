const classFilterFunction = require('../util/classFilter');
const seatFilterFunction = require('../util/seatFilter');
const departureDateFunction = require('../util/departureDateFilter');
const arrivalDateFunction = require('../util/arrivalDateFilter');
const departureLocationFunction = require('../util/departureLocationFilter');
const destinationLocationFunction = require('../util/destinationLocationFilter');

module.exports = { // this will contain every filter function
    classFilter: classFilterFunction.classFilter, // get class filter
    seatFilter: seatFilterFunction.seatFilter, // get seat filter
    departureDateFilter: departureDateFunction.departureDateFilter, // get departure date filter
    arrivalDateFilter: arrivalDateFunction.arrivalDateFilter, // get arrival date filter
    departureLocationFilter: departureLocationFunction.departureLocationFilter, // get departure location filter
    destinationLocationFilter: destinationLocationFunction.destinationLocationFilter // get destination location filter
};