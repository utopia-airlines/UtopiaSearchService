// Common SQL columns requested by both the search DAO and the seat-detail DAO.
module.exports = `seat_row, seat, class, departure_airport.code AS departure_code,
                departure_airport.name AS departure_name,
                destination_airport.code AS destination_name,
                destination_airport.name AS destination_name, departure_date,
                arrival_date, flight_number`;
