# Utopia Search Service

This microservice will be used by our main APIs to handle searching.

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/84944337fb8440c4b6410427f362ab3a)](https://www.codacy.com/app/sozaki19/UtopiaBookingService_2?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=utopia-airlines/UtopiaBookingService&amp;utm_campaign=Badge_Grade)

## Setup

1.  Create a `.env` file in this project's root (copy `.env.default` into the `.env` and then
    add values after the `=` for each of the keys)

## Tests

Run `npm test`
**NOTE:** For debugging errors with SQL queries, please add this code `verbose: console.log` 
to the following object (`{memory: true}`) being passed in as a parameter for new 
sqliteDatabase() located in `searchDao.js`, AND all `Spec js` files in the test directory.

## Documentation

When making a GET call, you can add query parameters. These are all of the parameters you 
can add.

``` http
?class=1&seat=A,B&departureDateAfter=2038-01-11&
departureDateBefore=2038-01-12&
arrivalDateAfter=2038-01-16&
arrivalDateBefore=2038-01-21&
departure_location=TWS,DSA&
destination_location=FSE,CAR
```

All of the query parameters are optional (no spaces should be included because they're not a character that is allowed to 
be included in a URL by the relevant Internet standards.)
-   `class`: range between 1st class and eco (represented by numbers, 1 meaning first class).
-   `seat`: give a list of seats that you desire.
-   `departureDateAfter`: depart on or after the given day.
-   `departureDateBefore`: all tickets that depart before the given day (not inclusive).
-   `arrivalDateAfter`: arrive on or after the given day.
-   `arrivalDateBefore`: all tickets that arrive before the given day (not inclusive).
-   `departure_location`: list of given depature locations (in IATA airport code format).
-   `destination_location`: list of desired destinations (in IATA airport code format).

For getting a list of airport details, here are the query parameters, which is *not* optional (this is only for the `get` function on the `airportDetailsDao` DAO)
-   `airport` : the airport code, which you want the airport details for

For getting a list of flight details, here are the query parameters, which is *not* optional:
-   `flight` : the flight number, which you want the flight details for

For getting a list of seats in a flight, here are the query parameter, which is *not*
optional:
-   `flight`: the flight number, which you want the seat details for (seat and row)

## Issues

-   You should not have to run `npm install --verbose`, but if you do you may run into this
    error with installing `better-sqlite3`. If so, you may need to run this command
    `npm i better-sqlite3 --save-dev` (I am not sure about the dev part)

-   **Warning**: If your project or this project is facing problems with dependencies, try 
    `npm audit fix` first please! The reason is because `npm audit` could have you running
    code that changes your npm config instead of the local `package.json`.